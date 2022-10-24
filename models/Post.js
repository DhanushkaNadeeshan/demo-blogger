import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please provide a title for this post"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content for this post"],
  },
  image:{
    type:String,
    required: [true, "Please provide a image for this post"],
  }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
