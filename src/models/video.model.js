import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile: {
            type: Sting, // cloudinary url
            required: true
        },
        thumbnail: {
            type: Sting, // cloudinary url
            required: true
        },
        title: {
            type: Sting,
            required: true
        },
        description: {
            type: Sting, 
            required: true
        },
        duraiton: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)