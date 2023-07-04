import styled from "styled-components";
import Section from "@components/Section";
import Card from "@components/Card";
import PlayBtn from "@components/PlayBtn";
import FallbackImage from "@components/FallbackImage";
import { Link, useNavigate } from "react-router-dom";
import { useHomeData } from "./useHomeData";

function Home() {
  const { followedAlbums, recentlyPlayed, newReleases } = useHomeData();
  const navigate = useNavigate();

  function handlerClick(id: string) {
    navigate(`/album/${id}`);
  }

  return (
    <Layout>
      <header>
        <WelcomeText className="text">Welcome</WelcomeText>
        <RecentlyPlayedLayout>
          {recentlyPlayed.slice(0, 6).map(({ id, images, name }) => (
            <RecentlyPlayed key={id} onClick={() => handlerClick(id)}>
              <FallbackImage
                className="cover"
                image={images[0]}
                alt={`${name} cover`}
              >
                <FallbackImage.NoteIcon size="sm" />
              </FallbackImage>
              <div className="container">
                <AlbumName to={`/album/${id}`} title={name}>
                  {name}
                </AlbumName>
                <HoverPlayBtn isPlaying={false} />
              </div>
            </RecentlyPlayed>
          ))}
        </RecentlyPlayedLayout>
      </header>
      <Section>
        <Section.Header>New Releases</Section.Header>
        <Section.Container inline>
          {newReleases.map(({ id, images, name, artists }) => (
            <Card key={id} to={`/album/${id}`}>
              <Card.Image image={images[0]} alt={`${name} image`}>
                <Card.NoteIcon />
              </Card.Image>
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
      <Section>
        <Section.Header>Followed Albums</Section.Header>
        <Section.Container inline>
          {followedAlbums.map(({ id, images, name, artists }) => (
            <Card key={id} to={`/album/${id}`}>
              <Card.Image image={images[0]} alt={`${name} image`}>
                <Card.NoteIcon />
              </Card.Image>
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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 64px 24px 32px 24px;
  color: #fff;
`;

const WelcomeText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const RecentlyPlayedLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 12px;
`;

const RecentlyPlayed = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, 0.1);
  font-size: 1rem;
  font-weight: 700;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  & .cover {
    height: 100%;
    aspect-ratio: 1;
  }

  & .container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 0 16px;
    overflow: hidden;
  }
`;

const AlbumName = styled(Link)`
  flex: 1;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HoverPlayBtn = styled(PlayBtn)`
  opacity: 0;
  transition: opacity 0.3s ease;

  ${RecentlyPlayed}:hover & {
    opacity: 1;
  }
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

export default Home;
