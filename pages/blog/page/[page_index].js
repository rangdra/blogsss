import fs from 'fs';
import path from 'path';

import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { POSTS_PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';
import { getPosts } from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

const Blog = ({ posts, numPages, currPage, categories }) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="p-5 text-5xl font-bold border-b-4">Blog Post</h1>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <Post key={idx} post={post} />
            ))}
          </div>
          <Pagination currPage={currPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  // get category name for sidebar
  const categories = posts.map((post) => post?.frontmatter?.category);
  const uniqCategories = [...new Set(categories && categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIdx = page - 1;
  const orderedPosts = posts?.slice(
    pageIdx * POSTS_PER_PAGE,
    (pageIdx + 1) * POSTS_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currPage: page,
      categories: uniqCategories,
    },
  };
};
