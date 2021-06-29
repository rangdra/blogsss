import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import marked from 'marked';

import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';

const DetailBlog = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  slug,
  content,
}) => {
  return (
    <Layout title={title}>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt="" className="w-full rounded" />

        <div className="flex items-center justify-between p-2 my-8 bg-gray-100">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <div className="mt-2 blog-text">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailBlog;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
};
