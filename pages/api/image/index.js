import dbConnect from "/lib/dbConnect";
import Image from "/models/Image";

export default async function imageHandler(req, res) {

    const { method } = req;
    // connect to database
    await dbConnect();

    switch (method) {
        case "GET":
            const images = await Image.find({}).select("_id, altText");
            res.status(200).json({ success: true, data: images });
            break;
        case "POST":
            const image = await Image.create(req.body);
            // res.redirect(307, '/post-editor')

            res.status(200).json({ success: true, data: image })
            break;
        default:
            res.status(400).json({ success: false, msg: 'send unwanted request' })
            break;
    }

}