import React from 'react';
import { useLoaderData } from 'react-router-dom';

const IndexPage: React.FC = () => {
  const { posts }: any = useLoaderData();

  return (
    <div>{
      posts.map((post: any) => <h1>{post.id}</h1>)  
    }</div>
  );
};

export default IndexPage;