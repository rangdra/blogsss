import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';

const Post = ({ post, compact }) => {
  return (
    <div className="w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md">
      {!compact && (
        <Image
          src={post?.frontmatter.cover_image}
          alt="post image"
          height={420}
          width={600}
          className="mb-4 rounded"
        />
      )}

      <div className="flex items-center justify-between">
        <span className="font-light text-gray-600">
          {post?.frontmatter.date}
        </span>
        <CategoryLabel>{post?.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${post?.slug}`}>
          <a className="text-2xl font-bold text-gray-700 hover:underline">
            {post?.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post?.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className="flex items-center justify-between mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">Read More</a>
          </Link>
          <div className="flex items-center">
            <Image
              src={post?.frontmatter.author_image}
              alt="author"
              height={40}
              width={40}
              className="hidden object-cover mx-4 rounded-full sm:block"
            />
            <h3 className="ml-4 font-bold text-gray-700">
              {post?.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
