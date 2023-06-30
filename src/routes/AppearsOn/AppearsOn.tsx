import styled from "styled-components";
import { useAppearsOnData } from "./useAppearsOnData";
import Section from "@components/Section";
import Card from "@components/Card";
import { Link } from "react-router-dom";

function AppearsOn() {
  const { appearsOn } = useAppearsOnData();

  return (
    <Layout>
      <Section>
        <Section.Header>Appears on</Section.Header>
        <Section.Container>
          {appearsOn.map(({ id, images, name, artists }) => (
            <Card key={id} to={`/album/${id}`}>
              <Card.Image src={images[0].url} alt={`${name} image`} />
              <Card.Name>{name}</Card.Name>
              <ArtistsLinks separator=",">
                {artists.map(({ id, name }) => (
                  <Link
                    key={id}
                    to={`/artist/${id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {name}
                  </Link>
                ))}
              </ArtistsLinks>
            </Card>
          ))}
        </Section.Container>
      </Section>
    </Layout>
  );
}

export default AppearsOn;

const Layout = styled.div`
  padding: 36px 24px;
`;

const ArtistsLinks = styled(Card.Description)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.grayText};

  & a:hover {
    text-decoration: underline;
  }
`;
