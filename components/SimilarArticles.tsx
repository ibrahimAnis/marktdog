import styled from 'styled-components';
import PostCard from './PostCard';

interface SimilarArticlesProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

const SimilarArticles = ({ posts }: SimilarArticlesProps) => {
  return (
    <Aside>
      <h3>Similar Articles</h3>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </Aside>
  );
};

const Aside = styled.aside`
  width: 30%;
  padding: 1rem;
  border-left: 1px solid #eaeaea;
`;

export default SimilarArticles;