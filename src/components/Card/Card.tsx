import styled from "styled-components";
import {
  ImgHTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import { Link, LinkProps, To, useNavigate } from "react-router-dom";
import PlayBtn from "@components/PlayBtn";
import InlineList, { InlineListProps } from "@components/InlineList";

interface CardContextProps {
  to: To;
}

const CardContext = createContext<CardContextProps>({ to: "" });

export interface CardProps {
  to: To;
}

function Card({ to, children }: PropsWithChildren<CardProps>) {
  const navigate = useNavigate();

  function handlerClick() {
    navigate(to);
  }

  return (
    <CardContext.Provider value={{ to }}>
      <Layout $bgColor="#2b2729" onClick={handlerClick}>
        {children}
      </Layout>
    </CardContext.Provider>
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

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

function Image(imgProps: ImageProps) {
  return (
    <Container>
      <Img {...imgProps} />
      <AnimatedPlayBtn isPlaying={false} />
    </Container>
  );
}

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
  object-fit: cover;
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

export type NameProps = Omit<LinkProps, "to">;

function Name({ children, ...linkProps }: PropsWithChildren<NameProps>) {
  const { to } = useContext(CardContext);
  return (
    <NameLink to={to} {...linkProps}>
      {children}
    </NameLink>
  );
}

const NameLink = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export type DescriptionProps = Partial<InlineListProps>;

function Description({
  children,
  separator = "",
  className,
}: PropsWithChildren<DescriptionProps>) {
  return (
    <DescriptionList className={className} separator={separator}>
      {children}
    </DescriptionList>
  );
}

const DescriptionList = styled(InlineList)`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grayText};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Object.assign(Card, { Image, Name, Description });
