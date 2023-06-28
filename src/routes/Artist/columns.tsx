import styled from "styled-components";
import { time, format } from "@utils/time";
import { Columns, DurationContainer } from "@components/CollectionList";
import StarPopularity from "@components/StarPopularity";

export interface TrackRow {
  title: { name: string; albumCover: string };
  popularity: number;
  duration: number;
}

export const columns: Columns<TrackRow> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, albumCover }) => (
      <TitleWrapper>
        <img
          className="album-cover"
          src={albumCover}
          alt={`${name} album cover`}
        />
        <div className="track-name">{name}</div>
      </TitleWrapper>
    ),
  },
  popularity: {
    header: "popularity",
    width: "2fr",
    render: (popularity) => <StarPopularity popularity={popularity} />,
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
