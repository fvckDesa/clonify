import styled from "styled-components";
import { useSearchData } from "./useSearchData";
import Section from "@components/Section";
import Card from "@components/Card";
import CollectionList from "@components/CollectionList";
import { TrackRow, columns } from "./columns";
import { useSearchHistory } from "@/context/SearchHistory";
import { useParams } from "react-router-dom";
import { WithId } from "@/types/utils";
import { Artist, PartialAlbum, PartialPlaylist } from "@/types/spotify";

function Search() {
  const { filter } = useParams<"filter">();
  const { artists, albums, playlists, tracks } = useSearchData();

  if (filter === "tracks" && tracks) {
    return (
      <Layout>
        <Tracks items={tracks} />
      </Layout>
    );
  }

  if (filter === "artists" && artists) {
    return (
      <Layout>
        <Artists items={artists} />
      </Layout>
    );
  }

  if (filter === "albums" && albums) {
    return (
      <Layout>
        <Albums items={albums} />
      </Layout>
    );
  }

  if (filter === "playlists" && playlists) {
    return (
      <Layout>
        <Playlists items={playlists} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Title>Tracks</Title>
      <Tracks items={tracks.slice(0, 4)} omitHeader />
      <Artists items={artists} inline />
      <Albums items={albums} inline />
      <Playlists items={playlists} inline />
    </Layout>
  );
}

export default Search;

const Layout = styled.div`
  padding: 0 24px;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

interface TracksProps {
  items: WithId<TrackRow>[];
  omitHeader?: boolean;
}

function Tracks({ items, omitHeader = false }: TracksProps) {
  return <TracksList columns={columns} items={items} omitHeader={omitHeader} />;
}

const TracksList = styled(CollectionList)`
  padding: 0 8px;
  margin-bottom: 25px;
`;

interface ArtistsProps {
  items: Artist[];
  inline?: boolean;
}

function Artists({ items, inline = false }: ArtistsProps) {
  const { setItem } = useSearchHistory();

  return (
    <Section>
      <Section.Header>Artists</Section.Header>
      <Section.Container inline={inline}>
        {items.map((artist) => {
          const { id, images, name } = artist;
          return (
            <Card key={id} to={`/artist/${id}`} onClick={() => setItem(artist)}>
              <ArtistImage image={images[0]} alt={`${name} image`}>
                <Card.PersonIcon />
              </ArtistImage>
              <Card.Name>{name}</Card.Name>
              <Card.Description>Artist</Card.Description>
            </Card>
          );
        })}
      </Section.Container>
    </Section>
  );
}

const ArtistImage = styled(Card.Image)`
  border-radius: 100%;
`;

interface AlbumProps {
  items: PartialAlbum[];
  inline?: boolean;
}

function Albums({ items, inline = false }: AlbumProps) {
  const { setItem } = useSearchHistory();

  return (
    <Section>
      <Section.Header>Albums</Section.Header>
      <Section.Container inline={inline}>
        {items.map((album) => {
          const { id, images, name, release_date, artists } = album;
          return (
            <Card key={id} to={`/album/${id}`} onClick={() => setItem(album)}>
              <Card.Image image={images[0]} alt={`${name} image`}>
                <Card.NoteIcon />
              </Card.Image>
              <Card.Name>{name}</Card.Name>
              <Card.Description separator={{ content: "•", space: 5 }}>
                <span>{release_date.getFullYear()}</span>
                <span>{artists[0].name}</span>
              </Card.Description>
            </Card>
          );
        })}
      </Section.Container>
    </Section>
  );
}

interface PlaylistsProps {
  items: PartialPlaylist[];
  inline?: boolean;
}

function Playlists({ items, inline = false }: PlaylistsProps) {
  const { setItem } = useSearchHistory();

  return (
    <Section>
      <Section.Header>Playlists</Section.Header>
      <Section.Container inline={inline}>
        {items.map((playlist) => {
          const { id, images, name, owner } = playlist;
          return (
            <Card
              key={id}
              to={`/artist/${id}`}
              onClick={() => setItem(playlist)}
            >
              <Card.Image image={images[0]} alt={`${name} image`}>
                <Card.NoteIcon />
              </Card.Image>
              <Card.Name>{name}</Card.Name>
              <Card.Description>
                <span>By {owner.display_name}</span>
              </Card.Description>
            </Card>
          );
        })}
      </Section.Container>
    </Section>
  );
}
