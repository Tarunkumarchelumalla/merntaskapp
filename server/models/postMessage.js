import mongoose from "mongoose";

const postSchema =mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    description : String,
    message : String,
    subscription:{
        type:Number,
        default:13235
    },
    like:{
        type:Number,
        default:0
    }
});
const PostMessage = mongoose.model('PostMessage',postSchema);
export default PostMessage;