import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
// those tags are used when you write ```js  {code here} ```
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("py", python);

// styling 
const mainStyle = {
    width: "100%",
    padding: "2rem 4rem"

}

const wrap = {
    width: "60%",
    backgroundColor: "beige",
    padding: "1rem",
    margin: "auto"
}

export default function Post({ post }) {

    const router = useRouter();
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main style={mainStyle}>
                <div style={{width:"100%"}}>
                    <button onClick={() => router.push('/')}>home</button>
                </div>

                <div className='post-container'>
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
                    >{post.content}</ReactMarkdown>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps({query}) {
    // TODO base url setup
    const res = await fetch(`http://localhost:3000/api/post/${query.slug}`)
    const post = await res.json()
    return { props: { post: post.data } };
}

