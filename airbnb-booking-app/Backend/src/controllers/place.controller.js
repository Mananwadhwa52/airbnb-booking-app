const { cloudinary } = require('../config/cloudinary');
const { Place } = require('../models/place.model');

// Helper: upload a buffer to Cloudinary using upload_stream
function uploadToCloudinary(fileBuffer, folder) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
}

const uploadImageByLink = async (req, res) => {
    try {
        const { link } = req.body;
        if (!link) {
            return res.status(400).json({
                success: false,
                message: "Image link is required",
            })
        }

        // Upload image directly from URL to Cloudinary
        const result = await cloudinary.uploader.upload(link, {
            folder: 'airbnb-places',
        });

        return res.status(200).json({
            success: true,
            message: "Image added successfully",
            url: result.secure_url,
        })

    } catch (error) {
        console.log("Error coming while uploading image by link: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const uploadPhotos = async (req, res) => {
    try {
        // Upload each file buffer to Cloudinary
        const uploadPromises = req.files.map(file => 
            uploadToCloudinary(file.buffer, 'airbnb-places')
        );

        const results = await Promise.all(uploadPromises);

        const uploadedFiles = results.map(result => ({
            url: result.secure_url,
            filename: result.public_id,
        }));

        res.json(uploadedFiles);
    } catch (error) {
        console.log("Error coming while uploading photos: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const addNewPlace = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const newPlace = await Place.create({ ...req.body, owner: loggedInUser._id });

        res.status(200).json({
            success: true,
            message: "Accomodation added successfully",
            place: newPlace,
        })

    } catch (error) {
        console.log("Error coming while adding new place: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getMyPlaces = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const myPlaces = await Place.find({ owner: loggedInUser._id })

        if (!myPlaces) {
            return res.status(200).json({
                success: true,
                message: "You have no accomodations yet"
            })
        }

        res.status(200).json({
            success: true,
            myPlaces: myPlaces,
        })

    } catch (error) {
        console.log("Error coming while fetching my places: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getPlace = async (req, res) => {
    try {
        const { placeId } = req.params;

        if(!placeId) {
            return res.status(400).json({
                success : false,
                message : "PlaceID is required",
            })
        }



        // find the place
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Place fetched successfully",
            place,
        })
    } catch (error) {
        console.log("Error coming while fetching place: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getAllPlaces = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const allPlaces = await Place.find({ owner: { $ne: loggedInUser._id } })
            .populate('owner', 'name email -_id')
            .lean()  

        return res.status(200).json({
            success: true,
            allPlaces,
        })

    } catch (error) {
        console.log("Error coming while fetching all places: " + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getFilteredPlaces = async(req, res) => {
    try {
        const {location, name} = req.query;
        
        const locationRegex = location ? new RegExp(location, "i") : null;
        const nameRegex = name ? new RegExp(name, "i") : null;

        const query = {
            $or : []
        }

        if(locationRegex) query.$or.push({address : locationRegex})
        if(nameRegex) query.$or.push({title : nameRegex})

        const filteredPlaces = await Place.find(query);
    
        if(filteredPlaces.length === 0) {
            return res.status(200).json({
                success : false,
                message : "No places found",
                places : [],
            })
        }

        res.status(200).json({
            success : true,
            message : "Places found successfully",
            places : filteredPlaces,
        })

    } catch (error) {
        console.log("Error coming while searching places" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

module.exports = {
    uploadImageByLink,
    uploadPhotos,
    addNewPlace,
    getMyPlaces,
    getPlace,
    getAllPlaces,
    getFilteredPlaces
}
