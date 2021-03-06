import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

const CategoryBlogPost = ({ posts, categoryName, categories }) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="p-5 text-5xl font-bold border-b-4">
            Posts In {categoryName}
          </h1>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <Post key={idx} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryBlogPost;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params: { category_name } }) => {
  const posts = getPosts();

  // get category name for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqCategories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );
  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqCategories,
    },
  };
};
