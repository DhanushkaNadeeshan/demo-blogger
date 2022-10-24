import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';


function GetAllImages() {

    const [images, setImageList] = useState([]);

    useEffect(() => {
        axios.get(`/api/image`).then(({ data }) => {
            if (data.success) {
                setImageList(data.data);
            }

        }).catch(err => {
            console.log("🚀 ~ file: index.js ~ line 16 ~ axios.get ~ err", err)

        })

    }, [])

    return images;
}


export default function ImageHandler() {

    const data = GetAllImages();
    const [imageSrc, setImage] = useState(null);
    const refImageFile = useRef(null);
    const refAltText = useRef(null);

    // image convert base64 and set state
    const handleImage = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setImage(reader.result);

            }
            reader.onerror = function (error) {
                console.log("Error", error)
            }
        } else {
            setImage(null)
        }
    }

    // upload image to the server
    const uploadImage = () => {

        const sendData = {
            image: imageSrc,
            altText: refAltText.current.value.trim()
        }
        axios.post('/api/image', sendData).then(({ data }) => {

            if (data.success) {
                alert("image is uploaded successfuly!")
            }
        }).catch(err => {
            console.log("🚀 ~ file: post-editor.js ~ line 74 ~ axios.post ~ err", err)
        })
    }

    return (<div className='image-handler'>

        <h2>Image Upload</h2>
        <div className='form-style'>
            <label>Alt Text</label>
            <input
                placeholder='Alt Text'
                ref={refAltText} />
        </div>
        <div className='form-style'>
            <input
                type="file"
                accept="image/*;capture=camcorder"
                ref={refImageFile}
                onChange={handleImage} />

        </div>
        <div className='form-style'>
            {imageSrc && <img
                width={"20%"}
                src={imageSrc}
                alt="text" />}

        </div>

        <div className='form-style'>
            <button onClick={uploadImage}>Upload Image</button>
        </div>

        {data && data.map((imageData, i) => {
            return <Image src={`/api/image/${imageData._id}`} key={i} width="100%" height="100%"></Image>
        })}

    </div>)
}