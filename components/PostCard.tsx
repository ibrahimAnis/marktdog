import Link from 'next/link';
import styled from 'styled-components';

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
}

const PostCard = ({ slug, title, excerpt }: PostCardProps) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
      <Link href={`/blog/${slug}`}>Read more</Link>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #eaeaea;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
`;

const Excerpt = styled.p`
  color: #666;
`;

export default PostCard;