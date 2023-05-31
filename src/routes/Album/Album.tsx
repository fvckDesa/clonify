import styled from "styled-components";
import Section from "@components/Section";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList, { Columns } from "@components/CollectionList";
import PlayBtn from "@components/PlayBtn/PlayBtn";
import { useState } from "react";
import { time, format } from "@utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const columns: Columns<{
  title: { name: string; authors: string[] };
  duration: number;
}> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, authors }) => (
      <TitleContainer>
        <span className="track-name">{name}</span>
        <Authors>
          {authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
        </Authors>
      </TitleContainer>
    ),
  },
  duration: {
    header: () => (
      <DurationContainer>
        <FontAwesomeIcon icon={faClock} size="lg" />
      </DurationContainer>
    ),
    width: { min: 120, max: "1fr" },
    render: (value) => (
      <DurationContainer>{format("{m}:{2s}", time(value))}</DurationContainer>
    ),
  },
};

const TRACKS: {
  id: string;
  title: { name: string; authors: string[] };
  duration: number;
}[] = [
  {
    id: "a1",
    title: { name: "test", authors: ["foo", "bar"] },
    duration: 3000,
  },
  { id: "a2", title: { name: "test2", authors: ["foo"] }, duration: 3002 },
  { id: "b1", title: { name: "test3", authors: ["bar"] }, duration: 3033 },
  { id: "b2", title: { name: "test4", authors: [] }, duration: 124 },
];

function Album() {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlerClick() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <Wrapper>
      <CollectionHeader
        title="Album"
        type="album"
        author="user"
        cover=""
        tracksNum={5}
        duration={38000}
      />
      <Actions>
        <PlayBtn isPlaying={isPlaying} size="lg" onClick={handlerClick} />
      </Actions>
      <CollectionList columns={columns} items={TRACKS} />
      <ArtistSection as={Section} title="other of Artist" inline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 24px;
`;

const DurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.grayText};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  & .track-name {
    font-size: 16px;
  }
`;

const Authors = styled.div`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grayText};
  & > span:not(:last-child)::after {
    content: ",";
  }
`;

const ArtistSection = styled.div`
  margin-top: 48px;
`;

export default Album;
