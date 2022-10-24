import dbConnect from "/lib/dbConnect";
import Post from "/models/Post";

export default async function post(req, res) {

    const { slug } = req.query;
    await dbConnect();
    try {
        const post = await Post.findOne({ slug }).exec();
        if (post) {
            res.status(200).json({ success: true, data: post })
        } else {
            res.status(404).json({ success: false , msg:"post can't find" })
        }
    } catch (error) {
        res.status(400).json({ success: false })
    }


}