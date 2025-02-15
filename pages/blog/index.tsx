import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostCard from '../../components/PostCard';

interface BlogProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      title: frontmatter.title,
      excerpt: content.substring(0, 200),
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;