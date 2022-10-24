import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImagesList() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/api/image/').then(({ data }) => {

            if (data.success) {
                setImages(data.data)
            }

        }).catch(err => {
            console.log("🚀 ~ file: ImagesList.js ~ line 11 ~ axios.get ~ err", err)
        })
    }, [])

    const copyUrl = (id, altText) => {

        navigator.clipboard.writeText(`![${altText}](/api/image/${id})`);
        alert('Copy image url')
    }

    return (<div>
        {images.map((data, i) =>
            <Image
                alt="uploaded image"
                src={`/api/image/${data._id}`}
                key={i}
                width="100%"
                height="100%"
                onClick={() => copyUrl(data._id, data.altText)} />)}
    </div>)

}