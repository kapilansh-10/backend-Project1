import {asyncHandler} from "../utils/asyncHandler.js" // Import asyncHandler
import { ApiError } from "../utils/ApiError.js" // import ApiError class from ApiError.js file
import { User } from "../models/user.model.js" // Import User model from user.model.js file
import { uploadOnCloudinary } from "../utils/cloudinary.js" // Import uploadOnCloudinary function from cloudinary.js file
import { ApiResponse } from "../utils/ApiResponse.js" // Import ApiResponse class from ApiResponse.js file

const registerUser = asyncHandler( async (req, res) => { // Wrap the function with asyncHandler function to handle errors in the function 
    // get user details from frontend i.e from postman 
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password} = req.body // Get the user details from the request body
    console.log("email: ", email);
    console.log("password: ",password);

    if( // Check if any of the fields are empty
        [fullName, email, username, password].some((field) => field?.trim() === "") 
    ) {
        throw new ApiError(400, "All fields are required") // Throw an error if any of the fields are empty
    }

    const existedUser = User.findOne({ // Check if the user already exists in the database
        $or: [{ username },{ email }] // Check if the username or email already exists
    })  

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists") // Throw an error if the user already exists
    }

    const avatarLocalPath = req.files?.avatar[0]?.path; // Check if the avatar is present in the request
    const coverImagePath = req.files?.coverImage[0]?.path; // Check if the cover image is present in the request

    if (!avatarLocalPath) { // Check if the avatar is not present
        throw new ApiError (400, "Avatar file is required") // Throw an error if the avatar is not present
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath) // Upload the avatar on Cloudinary
    const coverImage = await uploadOnCloudinary(coverImage) // Upload the cover image on Cloudinary

    if (!avatar) { // Check if the avatar is not present
        throw new ApiError (400, "Avatar file is required") // Throw an error if the avatar is not present
    }

    const user = await User.create({ // Create a new user in the database
        fullName, // Add the user details to the database
        avatar: avatar.url, // Add the avatar to the database
        coverImage: coverImage?.url || "", // Add the cover image to the database
        email, // Add the email to the database
        password, // Add the password to the database
        username: username.toLowerCase() // Add the username to the database
    })

    const createdUser = await User.findById(user._id).select( // Find the user by the user id
        "-password -refreshToken" // Remove the password and refresh token from the response
    )

    if (!createdUser) { // Check if the user is not created
        throw new ApiError(500, "Something went wrong while registring the user") // Throw an error if the user is not created
    }

    return res.status(201).json( // Return the response
        new ApiResponse.(200,createdUser, "User created successfully") // Return the response
    )

})

export { registerUser } // Export the function