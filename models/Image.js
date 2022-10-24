import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "required image"],
  },
  altText: {
    type: String,
    required: [true, "nead alt text"]
  }
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);