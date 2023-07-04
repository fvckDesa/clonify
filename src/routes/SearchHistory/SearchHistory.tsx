import styled from "styled-components";
import { useSearchHistory } from "@/context/SearchHistory";
import Section from "@components/Section";
import Card from "@components/Card";
import { Artist, PartialAlbum, PartialPlaylist } from "@/types/spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";

function SearchHistory() {
  const { history } = useSearchHistory();

  return (
    <SectionLayout>
      <Section.Header>Recent searches</Section.Header>
      <Section.Container>
        {history.map((item) => {
          switch (item.type) {
            case "album":
              return <AlbumCard key={item.id} album={item} />;
            case "artist":
              return <ArtistCard key={item.id} artist={item} />;
            case "playlist":
              return <PlaylistCard key={item.id} playlist={item} />;
            default:
              return null;
          }
        })}
      </Section.Container>
    </SectionLayout>
  );
}

export default SearchHistory;

const SectionLayout = styled(Section)`
  padding: 0 24px;
`;

const RelativeCard = styled(Card)`
  position: relative;
`;

interface AlbumCardProps {
  album: PartialAlbum;
}

function AlbumCard({ album }: AlbumCardProps) {
  const { id, name, images, release_date, artists } = album;

  return (
    <RelativeCard to={`/album/${id}`}>
      <RemoveBtn itemId={id} />
      <Card.Image image={images[0]} alt={`${name} image`}>
        <Card.NoteIcon />
      </Card.Image>
      <Card.Name>{name}</Card.Name>
      <Card.Description separator={{ content: "•", space: 5 }}>
        <span>{release_date.getFullYear()}</span>
        <span>{artists[0].name}</span>
      </Card.Description>
    </RelativeCard>
  );
}

interface ArtistCardProps {
  artist: Artist;
}

function ArtistCard({ artist }: ArtistCardProps) {
  const { id, name, images } = artist;

  return (
    <RelativeCard to={`/artist/${id}`}>
      <RemoveBtn itemId={id} />
      <ArtistImage image={images[0]} alt={`${name} image`}>
        <Card.PersonIcon />
      </ArtistImage>
      <Card.Name>{name}</Card.Name>
      <Card.Description>Artist</Card.Description>
    </RelativeCard>
  );
}

const ArtistImage = styled(Card.Image)`
  border-radius: 100%;
`;

interface PlaylistCardProps {
  playlist: PartialPlaylist;
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { id, name, images, owner } = playlist;

  return (
    <RelativeCard to={`/playlist/${id}`}>
      <RemoveBtn itemId={id} />
      <Card.Image image={images[0]} alt={`${name} image`}>
        <Card.NoteIcon />
      </Card.Image>
      <Card.Name>{name}</Card.Name>
      <Card.Description>By {owner.display_name}</Card.Description>
    </RelativeCard>
  );
}

interface RemoveBtnProps {
  itemId: string;
}

function RemoveBtn({ itemId }: RemoveBtnProps) {
  const { removeItem } = useSearchHistory();

  function handlerClick(e: MouseEvent) {
    e.stopPropagation();
    removeItem(itemId);
  }

  return (
    <Btn type="button" onClick={handlerClick}>
      <FontAwesomeIcon icon={faXmark} size="lg" />
    </Btn>
  );
}

const Btn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  z-index: 100;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
