import styled from "styled-components";
import Section from "@components/Section";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import PlayBtn from "@components/PlayBtn/PlayBtn";
import { useState } from "react";
import { useAlbum } from "./useAlbum";
import { columns } from "./columns";

function Album() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { album, tracks, duration } = useAlbum();

  function handlerClick() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <Wrapper>
      <CollectionHeader
        title={album.name}
        type={album.album_type}
        author={album.artists[0].name}
        cover={album.images[0].url}
        tracksNum={album.total_tracks}
        duration={duration}
      />
      <Actions>
        <PlayBtn isPlaying={isPlaying} size="lg" onClick={handlerClick} />
      </Actions>
      <CollectionList columns={columns} items={tracks} />
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

const ArtistSection = styled.div`
  margin-top: 48px;
`;

export default Album;
