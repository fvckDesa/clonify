import styled from "styled-components";
import Section from "@components/Section";
import PlayBtn from "@components/PlayBtn";
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
              <img
                className="cover"
                src={images[0].url}
                alt={`${name} cover`}
              />
              <div className="container">
                <AlbumName to={`/album/${id}`} title={name}>
                  {name}
                </AlbumName>
                <HoverPlayBtn isPlaying={false} size="sm" />
              </div>
            </RecentlyPlayed>
          ))}
        </RecentlyPlayedLayout>
      </header>
      <Section title="New Releases" items={newReleases} inline />
      <Section title="Followed Albums" items={followedAlbums} inline />
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
    padding: 0 16px;
  }
`;

const AlbumName = styled(Link)`
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

export default Home;
