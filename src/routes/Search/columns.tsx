import styled from "styled-components";
import { time, format } from "@utils/time";
import {
  Author,
  AuthorsList,
  Columns,
  DurationContainer,
} from "@components/CollectionList";
import { PartialArtist } from "@/types/spotify";

export interface TrackRow {
  title: { name: string; albumCover: string; authors: PartialArtist[] };
  duration: number;
}

export const columns: Columns<TrackRow> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, albumCover, authors }) => (
      <TitleWrapper>
        <img
          className="album-cover"
          src={albumCover}
          alt={`${name} album cover`}
        />
        <Container>
          <div className="track-name">{name}</div>
          <AuthorsList separator=",">
            {authors.map(({ id, name }) => (
              <Author
                key={id}
                to={`/artist/${id}`}
                title={name}
                onClick={(e) => e.stopPropagation()}
              >
                {name}
              </Author>
            ))}
          </AuthorsList>
        </Container>
      </TitleWrapper>
    ),
  },
  duration: {
    header: "duration",
    width: { min: 120, max: "1fr" },
    render: (value) => (
      <DurationContainer>{format("{m}:{2s}", time(value))}</DurationContainer>
    ),
  },
};

// eslint-disable-next-line react-refresh/only-export-components
const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;

  & .album-cover {
    width: 40px;
    height: 40px;
  }

  & .track-name {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
const Container = styled.div`
  flex: 1;
  overflow: hidden;
`;
