import styled from "styled-components";
import Section from "@components/Section";
import Card from "@components/Card";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import Actions from "@components/Actions";
import InlineList from "@components/InlineList";
import { useState, useMemo } from "react";
import { useAlbumData } from "./useAlbumData";
import { columns } from "./columns";
import { time, format } from "@utils/time";
import { getAlbumType } from "@utils/album";
import { Link } from "react-router-dom";

function Album() {
  const [isPlaying, setIsPlaying] = useState(false);

  const { album, tracks, duration, otherAlbums } = useAlbumData();

  const durationStr = useMemo(() => {
    const timeObj = time(duration);
    const timeParts: string[] = [];

    if (timeObj.hours > 0) {
      timeParts.push("{h} hr");
    }
    if (timeObj.minutes > 0) {
      timeParts.push("{m} min");
    }
    if (timeObj.seconds > 0 && timeObj.hours === 0) {
      timeParts.push("{s} sec");
    }

    return format(timeParts.join(" "), timeObj);
  }, [duration]);

  const type = useMemo(
    () => getAlbumType(album.album_type, album.total_tracks),
    [album.album_type, album.total_tracks]
  );

  function handlerClick() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <Wrapper>
      <AlbumHeader cover={album.images[0].url} size={192}>
        <h3 className="type">{type}</h3>
        <h1 className="title">{album.name}</h1>
        <Info>
          <InlineList separator={{ content: "•", space: 5 }}>
            {album.artists.map(({ id, name }) => (
              <Author
                key={id}
                to={`/artist/${id}`}
                title={name}
                onClick={(e) => e.stopPropagation()}
              >
                {name}
              </Author>
            ))}
            <span>{album.total_tracks} tracks</span>
          </InlineList>
          {","}
          <span className="duration">{durationStr}</span>
        </Info>
      </AlbumHeader>
      <FullActions isPlaying={isPlaying} size="lg" onClick={handlerClick} />
      <CollectionList columns={columns} items={tracks} />
      <ArtistSection>
        <Section.Header>Other of Artist</Section.Header>
        <Section.Container inline>
          {otherAlbums.map(({ id, images, name, release_date }) => (
            <Card key={id} to={`/album/${id}`}>
              <Card.Image src={images[0].url} alt={`${name} image`} />
              <Card.Name>{name}</Card.Name>
              <Card.Description>{release_date.getFullYear()}</Card.Description>
            </Card>
          ))}
        </Section.Container>
      </ArtistSection>
    </Wrapper>
  );
}

export default Album;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
`;

const AlbumHeader = styled(CollectionHeader)`
  height: clamp(340px, 30vh, 400px);
  padding: 24px 16px;
  padding-top: 0;

  & .type {
    font-size: 0.875rem;
    text-transform: capitalize;
  }

  & .title {
    font-size: 4.5rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 700;
  & > .duration {
    color: ${({ theme }) => theme.colors.grayText};
  }
`;

const Author = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FullActions = styled(Actions)`
  width: 100%;
  padding: 24px;
`;

const ArtistSection = styled(Section)`
  padding: 0 24px;
  margin-top: 48px;
`;
