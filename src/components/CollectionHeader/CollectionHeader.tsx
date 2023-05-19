import type { CollectionType } from "@/types/collection";
import styled from "styled-components";

export interface CollectionHeaderProps {
  title: string;
  type: CollectionType;
  author: string;
  cover: string;
  tracksNum: number;
  duration: number;
}

function CollectionHeader({
  title,
  type,
  author,
  cover,
  tracksNum,
  duration,
}: CollectionHeaderProps) {
  return (
    <Header>
      <Cover src={cover} />
      <TextContainer>
        <h3 className="type">{type}</h3>
        <h1 className="title">{title}</h1>
        <Info>
          <span>{author}</span>
          <Dot />
          <span>{tracksNum} tracks</span>
          {","}
          <span className="duration">{duration}</span>
        </Info>
      </TextContainer>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  gap: 24px;
  height: clamp(340px, 30vh, 400px);
  padding: 24px 16px;
  padding-top: 0;
`;

const Cover = styled.img`
  align-self: flex-end;
  width: 192px;
  height: 192px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  height: 100%;
  & > .type {
    font-size: 0.875rem;
    text-transform: capitalize;
  }
  & > .title {
    font-size: 4.5rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 700;
  & > .duration {
    color: #ffffffba;
  }
`;

const Dot = styled.div`
  &::before {
    content: "•";
  }
`;

export default CollectionHeader;
