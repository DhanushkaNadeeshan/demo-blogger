import dbConnect from "/lib/dbConnect";
import Image from "/models/Image";

export default function imageHandler(req, res) {

    return new Promise(async (resolve, reject) => {
        const { method } = req;
        // connect to database
        await dbConnect();

        switch (method) {
            case "GET":

                const { id } = req.query;
                const { image } = await Image.findOne({ _id: id }).select("image");
                
                let imageData = image.split(",");
                let extention = imageData[0].split(":")[1];
                
                extention = extention.split(";")[0];
                let ds = await new Buffer.from(imageData[1], "base64");

                res.setHeader("Content-Type", extention);
                res.status(200).send(ds);
                return resolve();


            default:
                res.status(400).json({ success: false, msg: 'send unwanted request' })
                return resolve();

        }

    })



}