import styled from "styled-components";
import { useSearchData } from "./useSearchData";
import Section from "@components/Section";
import Card from "@components/Card";
import CollectionList from "@components/CollectionList";
import { columns } from "./columns";
import { useSearchHistory } from "@/context/SearchHistory";

function Search() {
  const { artists, albums, playlists, tracks } = useSearchData();
  const { setItem } = useSearchHistory();

  return (
    <Layout>
      <Title>Tracks</Title>
      <Tracks columns={columns} items={tracks.slice(0, 4)} omitHeader />
      <Section>
        <Section.Header>Artists</Section.Header>
        <Section.Container inline>
          {artists.map((artist) => {
            const { id, images, name } = artist;
            return (
              <Card
                key={id}
                to={`/artist/${id}`}
                onClick={() => setItem(artist)}
              >
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
      <Section>
        <Section.Header>Albums</Section.Header>
        <Section.Container inline>
          {albums.map((album) => {
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
      <Section>
        <Section.Header>Playlists</Section.Header>
        <Section.Container inline>
          {playlists.map((playlist) => {
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
                <Card.Description>By {owner.display_name}</Card.Description>
              </Card>
            );
          })}
        </Section.Container>
      </Section>
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

const Tracks = styled(CollectionList)`
  padding: 0 8px;
  margin-bottom: 25px;
`;

const ArtistImage = styled(Card.Image)`
  border-radius: 100%;
`;
