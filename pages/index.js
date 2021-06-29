import Link from 'next/link';

import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';

const Home = ({ posts }) => {
  return (
    <Layout>
      <h1 className="p-5 text-5xl font-bold border-b-4">Latest Post</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
      </div>
      <Link href="/blog">
        <a className="block w-full py-4 my-5 text-center text-gray-800 transition duration-500 border border-gray-500 rounded-md hover:text-gray-50 ease hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          All Posts
        </a>
      </Link>
    </Layout>
  );
};

export default Home;

export const getStaticProps = () => {
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
};
