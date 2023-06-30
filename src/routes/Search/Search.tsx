import styled from "styled-components";
import { useSearchData } from "./useSearchData";
import Section from "@components/Section";
import Card from "@components/Card";
import CollectionList from "@components/CollectionList";
import { columns } from "./columns";

function Search() {
  const { artists, albums, playlists, tracks } = useSearchData();

  return (
    <Layout>
      <Title>Tracks</Title>
      <Tracks columns={columns} items={tracks.slice(0, 4)} omitHeader />
      <Section>
        <Section.Header>Artists</Section.Header>
        <Section.Container inline>
          {artists.map(({ id, images, name }) => (
            <Card key={id} to={`/artist/${id}`}>
              <ArtistImage src={images[0].url} alt={`${name} image`} />
              <Card.Name>{name}</Card.Name>
              <Card.Description>Artist</Card.Description>
            </Card>
          ))}
        </Section.Container>
      </Section>
      <Section>
        <Section.Header>Albums</Section.Header>
        <Section.Container inline>
          {albums.map(({ id, images, name, release_date, artists }) => (
            <Card key={id} to={`/album/${id}`}>
              <Card.Image src={images[0].url} alt={`${name} image`} />
              <Card.Name>{name}</Card.Name>
              <Card.Description separator={{ content: "•", space: 5 }}>
                <span>{release_date.getFullYear()}</span>
                <span>{artists[0].name}</span>
              </Card.Description>
            </Card>
          ))}
        </Section.Container>
      </Section>
      <Section>
        <Section.Header>Playlists</Section.Header>
        <Section.Container inline>
          {playlists.map(({ id, images, name, owner }) => (
            <Card key={id} to={`/artist/${id}`}>
              <ArtistImage src={images[0].url} alt={`${name} image`} />
              <Card.Name>{name}</Card.Name>
              <Card.Description>By {owner.display_name}</Card.Description>
            </Card>
          ))}
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
