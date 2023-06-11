import styled from "styled-components";
import PlayBtn from "@components/PlayBtn";
import { Link, useNavigate } from "react-router-dom";

export interface CardProps {
  name: string;
  description: string;
  cover: string;
  url: string;
}

function Card({ name, description, cover, url }: CardProps) {
  const navigate = useNavigate();

  function handlerClick() {
    navigate(url);
  }

  return (
    <Layout $bgColor="#2b2729" onClick={handlerClick}>
      <Container>
        <Img src={cover} alt={`${name} cover`} />
        <AnimatedPlayBtn isPlaying={false} />
      </Container>
      <Name to={url} title={name}>
        {name}
      </Name>
      <Description>{description}</Description>
    </Layout>
  );
}

const Layout = styled.div<{ $bgColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ $bgColor }) => $bgColor + "cc"};
  text-decoration: none;
  transition: background-color 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: ${({ $bgColor }) => $bgColor};
  }
`;

const Container = styled.span`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
`;

const AnimatedPlayBtn = styled(PlayBtn)`
  position: absolute;
  right: 8px;
  bottom: ${({ isPlaying }) => `${isPlaying ? 8 : 0}px`};
  transition: all 0.3s ease;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  opacity: ${({ isPlaying }) => (isPlaying ? 1 : 0)};
  ${Layout}:hover & {
    bottom: 8px;
    opacity: 1;
  }
`;

const Name = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Description = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grayText};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Card;
