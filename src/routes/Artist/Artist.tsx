import { useState } from "react";
import styled from "styled-components";
import { useArtistData } from "./useArtistData";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import StarPopularity from "@components/StarPopularity";
import Actions from "@components/Actions";
import Section from "@components/Section";
import Card from "@components/Card";
import { columns } from "./columns";
import { filters, FilterValue } from "./constants";

const SM_VIEW = 5;
const LG_VIEW = 10;

function Artist() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const { artist, topTracks, discography, appearsOn, relatedArtists } =
    useArtistData();
  const [isViewingMore, setIsViewingMore] = useState(false);

  function changeView() {
    setIsViewingMore((prev) => !prev);
  }

  function handlerFilterChange(filter: FilterValue) {
    setFilter(filter);
  }

  return (
    <>
      <ArtistHeader cover={artist.images[0]} size={220}>
        <h1 className="name">{artist.name}</h1>
        <span className="followers">
          {new Intl.NumberFormat().format(artist.followers.total)} followers
        </span>
        <Popularity popularity={artist.popularity} />
      </ArtistHeader>
      <FullActions isPlaying={false} size="lg" />
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
        <Section>
          <Section.Header redirect={`discography/${filter}`}>
            Discography
          </Section.Header>
          <Section.Filters
            filters={filters}
            activeFilter={filter}
            onFilterChange={handlerFilterChange}
          />
          <Section.Container inline>
            {discography
              .filter(
                ({ album_type }) => filter === "all" || filter === album_type
              )
              .map(({ id, images, name, release_date, album_type }) => (
                <Card key={id} to={`/album/${id}`}>
                  <Card.Image image={images[0]} alt={`${name} image`}>
                    <Card.NoteIcon />
                  </Card.Image>
                  <Card.Name>{name}</Card.Name>
                  <Card.Description separator={{ content: "•", space: 5 }}>
                    <span>{release_date.getFullYear()}</span>
                    <span>{album_type}</span>
                  </Card.Description>
                </Card>
              ))}
          </Section.Container>
        </Section>
        <Section>
          <Section.Header redirect="related">
            Fans appreciate it too
          </Section.Header>
          <Section.Container inline>
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
        <Section>
          <Section.Header redirect="appears-on">Appears on</Section.Header>
          <Section.Container inline>
            {appearsOn.map(({ id, images, name, release_date, album_type }) => (
              <Card key={id} to={`/album/${id}`}>
                <Card.Image image={images[0]} alt={`${name} image`}>
                  <Card.NoteIcon />
                </Card.Image>
                <Card.Name>{name}</Card.Name>
                <Card.Description separator={{ content: "•", space: 5 }}>
                  <span>{release_date.getFullYear()}</span>
                  <span>{album_type}</span>
                </Card.Description>
              </Card>
            ))}
          </Section.Container>
        </Section>
      </SpacedLayout>
    </>
  );
}

export default Artist;

const ArtistHeader = styled(CollectionHeader)`
  width: 100%;
  padding: 24px;
  color: #fff;

  & .name {
    font-size: 6rem;
  }

  & .followers {
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0 16px;
  }
`;

const Popularity = styled(StarPopularity)`
  padding: 0 16px;
  margin-top: 5px;
`;

const FullActions = styled(Actions)`
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

const ArtistImage = styled(Card.Image)`
  border-radius: 100%;
`;
