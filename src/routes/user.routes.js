import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post( // Create a route for the register endpoint
    upload.fields([ // Use the upload.fields middleware to upload the avatar and coverImage
        {
            name: "avatar", // Set the name of the field to avatar 
            maxCount: 1 // Set the maximum number of files to 1
        },
        {
            name: "coverImage", // Set the name of the field to coverImage 
            maxCount: 1 // Set the maximum number of files to 1
        }
    ]),
    registerUser // Call the registerUser function
)



export default router;