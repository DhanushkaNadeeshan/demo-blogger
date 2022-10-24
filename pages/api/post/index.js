import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

export default async function creatPost(req, res) {

    const { method } = req;
    // connect to database
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.find({}).select("_id image slug") /* find all the data in our database */
                res.status(200).json({ success: true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const post = await Post.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: post })

            } catch (error) {

            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }

}