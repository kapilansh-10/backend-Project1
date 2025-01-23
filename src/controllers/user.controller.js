import {asyncHandler} from "../utils/asyncHandler.js" // Import asyncHandler

const registerUser = asyncHandler( async (req, res) => { // Wrap the function with asyncHandler function to handle errors in the function 
    res.status(200).json({
        message: "ok"
    })
})

export { registerUser } // Export the function