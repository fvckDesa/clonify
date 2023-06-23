import styled from "styled-components";
import { time, format } from "@utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  Author,
  AuthorsList,
  Columns,
  DurationContainer,
} from "@components/CollectionList";
import { PartialArtist } from "@/types/spotify";

export interface TrackRow {
  title: { name: string; albumCover: string; authors: PartialArtist[] };
  album: { name: string; id: string };
  addedAt: Date;
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
  album: {
    header: "album",
    width: "2fr",
    render: ({ name, id }) => (
      <Text>
        <Author to={`/album/${id}`} title={name}>
          {name}
        </Author>
      </Text>
    ),
  },
  addedAt: {
    header: "Added the day",
    width: "2fr",
    render: (day) => (
      <Text>
        {new Intl.DateTimeFormat("en-UK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(day)}
      </Text>
    ),
  },
  duration: {
    header: () => (
      <DurationContainer>
        <FontAwesomeIcon icon={faClock} size="lg" />
      </DurationContainer>
    ),
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

// eslint-disable-next-line react-refresh/only-export-components
const Text = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.grayText};
`;
