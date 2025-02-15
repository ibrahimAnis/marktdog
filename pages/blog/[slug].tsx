import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import SimilarArticles from '../../components/SimilarArticles';

interface PostPageProps {
  frontmatter: {
    title: string;
    date: string;
  };
  content: string;
  similarPosts: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

const PostPage = ({ frontmatter: { title, date }, content, similarPosts }: PostPageProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <article style={{ width: '65%' }}>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <SimilarArticles posts={similarPosts} />
    </div>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const files = fs.readdirSync(path.join('posts'));
  const similarPosts = files.map((filename) => {
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
      frontmatter,
      content: contentHtml,
      similarPosts,
    },
  };
}

export default PostPage;