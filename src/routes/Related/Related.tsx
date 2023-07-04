import styled from "styled-components";
import { useRelatedData } from "./useRelatedData";
import Section from "@components/Section";
import Card from "@components/Card";

function Related() {
  const { relatedArtists } = useRelatedData();

  return (
    <Layout>
      <Section>
        <Section.Header redirect="related">
          Fans appreciate it too
        </Section.Header>
        <Section.Container>
          {relatedArtists.map(({ id, images, name }) => (
            <Card key={id} to={`/artist/${id}`}>
              <ArtistImage image={images[0]} alt={`${name} image`}>
                <Card.PersonIcon />
              </ArtistImage>
              <Card.Name>{name}</Card.Name>
              <Card.Description>Artist</Card.Description>
            </Card>
          ))}
        </Section.Container>
      </Section>
    </Layout>
  );
}

export default Related;

const Layout = styled.div`
  padding: 36px 24px;
`;

const ArtistImage = styled(Card.Image)`
  border-radius: 100%;
`;
