import styled from "styled-components";
import { useDiscographyData } from "./useDiscographyData";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import InlineList from "@components/InlineList";
import Actions from "@components/Actions";
import { columns } from "./columns";
import { getAlbumType } from "@utils/album";
import { useScroll } from "@/context/scroll";
import { Link } from "react-router-dom";

function Discography() {
  const { discography } = useDiscographyData();
  const { top } = useScroll();

  return (
    <Container>
      <Artist $isTop={top > 0}>
        <Link to={`/artist/${discography[0].artists[0].id}`}>
          {discography[0].artists[0].name}
        </Link>
      </Artist>
      <DiscographyList>
        {discography.map(
          ({
            id,
            name,
            images,
            album_type,
            release_date,
            total_tracks,
            tracks,
          }) => (
            <li key={id}>
              <AlbumHeader cover={images[0].url} size={136}>
                <Name>
                  <Link to={`/album/${id}`}>{name}</Link>
                </Name>
                <Info separator={{ content: "•", space: 5 }}>
                  <span>{getAlbumType(album_type, total_tracks)}</span>
                  <span>{release_date.getFullYear()}</span>
                  <span>{total_tracks} tracks</span>
                </Info>
                <Actions isPlaying={false} size="sm" />
              </AlbumHeader>
              <TackList columns={columns} items={tracks.items} />
            </li>
          )
        )}
      </DiscographyList>
    </Container>
  );
}

export default Discography;

const Container = styled.div`
  position: relative;
`;

const Artist = styled.header<{ $isTop: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: ${({ $isTop }) =>
    $isTop ? "0 6px 10px rgba(0, 0, 0, 0.6)" : "0 0 0 rgb(0, 0, 0)"};
  z-index: 100;

  & a:hover {
    text-decoration: underline;
  }
`;

const DiscographyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #fff;
`;

const AlbumHeader = styled(CollectionHeader)`
  display: flex;
  gap: 24px;
  padding: 32px;
`;

const Info = styled(InlineList)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayText};
  padding: 8px 0;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  & a:hover {
    text-decoration: underline;
  }
`;

const TackList = styled(CollectionList)`
  padding: 0 32px;
`;
