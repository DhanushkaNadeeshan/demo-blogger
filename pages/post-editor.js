import Head from 'next/head';
import { useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown'
import Editor from '@monaco-editor/react';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import only whatever languages you are using. Thaw will dramatically reduce the build size of the page
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import axios from 'axios';
import ImagesList from '/components/ImagesList'
// those tags are used when you write ```js  {code here} ```
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("py", python);

const formStyle = {
  padding: "1rem",
  width: "50%",
}

// TODO
// 1. replace space with -
// 2. published date
// 3. author
// 4. meta description
// 5. key words

export default function PostEditor() {

  const [data, setData] = useState("");
  const refSlugInput = useRef(null);
  const refImageInput = useRef(null);

  const save = () => {
    // const data = refResult.current;
    let slug = refSlugInput.current.value.trim();
    slug = slug.replaceAll(" ", "-");
    const image = refImageInput.current.value.trim();

    const sendData = {
      slug,
      content: data,
      image
    }

    // axios.post('/api/post', sendData).then(rs => {
    //   // console.log("🚀 ~ file: index.js ~ line 79 ~ axios.post ~ rs", rs)
    // })

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DEMO MD</title>
        <meta name="description" content="Demo md" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Editor</h1>
        {/* add Title */}
        <div style={formStyle}>
          <button onClick={save}>save</button>
          <p>Enter Slug</p>
          <input placeholder='Title' ref={refSlugInput} style={{ width: "50%" }} ></input>
        </div>
        <div style={formStyle}>
          <p>Image</p>
          <input placeholder='Image' ref={refImageInput} style={{ width: "50%" }} ></input>
        </div>
        <div style={formStyle}>
          <ImagesList />
        </div>
        <div className='container'>

          <div className='editor'>
            <Editor
              height="70vh"
              defaultLanguage="Markdown"
              theme="vs-dark"
              defaultValue={data}
              onChange={(value) => setData(value)}
            />
          </div>
          <div className='wrap'>
            {/* {data && <MDXRemote {...source} components={components} />} */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >{children}</SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

              }}

            >{data}</ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  )
}

