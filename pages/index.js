import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';


//  create custome hook for fetching data
function GetAllPost() {

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.get(`/api/post`).then(({ data }) => {
      if (data.success) {
        setPostList(data.data);
      }

    }).catch(err => {
      console.log("🚀 ~ file: index.js ~ line 16 ~ axios.get ~ err", err)

    })

  }, [])

  return postList
}



export default function Home() {

  const router = useRouter();
  const data = GetAllPost();

  return (
    <>
      <Head>
        <title>DEMO MD</title>
        <meta name="description" content="Demo md" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <button onClick={() => router.push('/post-editor')}>Editor</button>
      </nav>
      <main>
        <h1>Demo Blog Poster with Next js</h1>
        <div className='blog-list'>
          {data && data.map((post, i) => (
            <div className='blog-post' key={i}>
              <Image width="200px" height="105px" src={`/api/image/${post.image}`} alt="post image" ></Image>
              <h3>{post.slug.replaceAll("-"," ")}</h3>
              <Link href={`/blog/${post.slug}`} >
                <a>View</a>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}




