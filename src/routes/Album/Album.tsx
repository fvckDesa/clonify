import styled from "styled-components";
import Section from "@components/Section";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import PlayBtn from "@components/PlayBtn/PlayBtn";
import type { Columns } from "@components/CollectionList/type";
import { useState } from "react";

const columns: Columns<{ title: string; duration: number }> = {
  title: {
    header: "title",
    width: "4fr",
  },
  duration: {
    header: () => <DurationContainer>duration</DurationContainer>,
    width: { min: 120, max: "1fr" },
    render: (value) => <DurationContainer>{value}</DurationContainer>,
  },
};

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
        duration={10}
      />
      <Actions>
        <PlayBtn isPlaying={isPlaying} size="lg" onClick={handlerClick} />
      </Actions>
      <CollectionList
        columns={columns}
        items={[{ title: "test", duration: 3000 }]}
      />
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
`;

const ArtistSection = styled.div`
  margin-top: 48px;
`;

export default Album;
