import styled from "styled-components";
import PlayBtn from "@components/PlayBtn";
import InlineList from "@components/InlineList";
import { Link, useNavigate } from "react-router-dom";
import type { PartialArtist } from "@/types/spotify";
import type { CardType } from "./types";

export interface CardProps {
  name: string;
  description: string | PartialArtist[];
  cover: string;
  url: string;
  type?: CardType;
}

function Card({ name, description, cover, url, type = "album" }: CardProps) {
  const navigate = useNavigate();

  function handlerClick() {
    navigate(url);
  }

  return (
    <Layout $bgColor="#2b2729" onClick={handlerClick}>
      <Container>
        <Img src={cover} alt={`${name} cover`} $type={type} />
        <AnimatedPlayBtn isPlaying={false} />
      </Container>
      <Name to={url} title={name}>
        {name}
      </Name>
      {typeof description === "string" ? (
        <Description>{description}</Description>
      ) : (
        <Description as={InlineList} separator=",">
          {description.map(({ id, name }) => (
            <Author
              key={id}
              to={`/artist/${id}`}
              title={name}
              onClick={(e) => e.stopPropagation()}
            >
              {name}
            </Author>
          ))}
        </Description>
      )}
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

const Img = styled.img<{ $type: CardType }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ $type }) => ($type === "artist" ? "100%" : "6px")};
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

const Author = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Card;
