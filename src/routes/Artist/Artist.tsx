import { useState } from "react";
import styled from "styled-components";
import { useArtistData } from "./useArtistData";
import PlayBtn from "@components/PlayBtn";
import CollectionList from "@components/CollectionList";
import StarPopularity from "@components/StarPopularity";
import Section from "@components/Section";
import { columns } from "./columns";

const SM_VIEW = 5;
const LG_VIEW = 10;

function Artist() {
  const { artist, topTracks, discography, appearsOn, relatedArtists } =
    useArtistData();
  const [isViewingMore, setIsViewingMore] = useState(false);

  function changeView() {
    setIsViewingMore((prev) => !prev);
  }

  return (
    <>
      <Info>
        <img
          className="avatar"
          src={artist.images[0].url}
          alt={`${artist.name} avatar`}
        />
        <div>
          <h1 className="name">{artist.name}</h1>
          <span className="followers">
            {new Intl.NumberFormat().format(artist.followers.total)} followers
          </span>
          <ArtistPopularity popularity={artist.popularity} />
        </div>
      </Info>
      <Actions>
        <PlayBtn isPlaying={false} size="lg" />
      </Actions>
      <SpacedLayout>
        <TopTracks>
          <h2>Popular</h2>
          <CollectionList
            columns={columns}
            items={topTracks.slice(0, isViewingMore ? LG_VIEW : SM_VIEW)}
            omitHeader
          />
          <button className="view" onClick={changeView}>
            {isViewingMore ? "View less" : "View more"}
          </button>
        </TopTracks>
        <Section title="Discography" items={discography} inline />
        <Section title="Appears on" items={appearsOn} inline />
        <Section title="Related artists" items={relatedArtists} inline />
      </SpacedLayout>
    </>
  );
}

export default Artist;

const Info = styled.header`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 24px;
  color: #fff;

  & .avatar {
    width: 220px;
    height: 220px;
    object-fit: cover;
  }

  & .name {
    font-size: 6rem;
  }

  & .followers {
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0 16px;
  }
`;

const ArtistPopularity = styled(StarPopularity)`
  padding: 0 16px;
  margin-top: 5px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 24px;
`;

const SpacedLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
  color: #fff;
`;

const TopTracks = styled.div`
  padding-bottom: 64px;

  & .title {
    margin-bottom: 12px;
  }

  & .view {
    padding: 16px;
    color: ${({ theme }) => theme.colors.grayText};
    font-weight: 700;
    background-color: transparent;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`;
