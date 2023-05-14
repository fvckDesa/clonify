import styled from "styled-components";

export interface CardProps {
  name: string;
  description: string;
}

function Card({ name, description }: CardProps) {
  return (
    <Layout>
      <Img />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Layout>
  );
}

const bgColor = "#2b2729";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${bgColor + "cc"};
  transition: background-color 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: ${bgColor};
  }
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Description = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => `${theme.colors.primary}dd`};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Card;
