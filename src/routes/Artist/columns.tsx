import styled from "styled-components";
import { time, format } from "@utils/time";
import { Columns, DurationContainer } from "@components/CollectionList";
import StarPopularity from "@components/StarPopularity";
import FallbackImage from "@components/FallbackImage";
import { Image } from "@/types/spotify";

export interface TrackRow {
  title: { name: string; albumCover: Image };
  popularity: number;
  duration: number;
}

export const columns: Columns<TrackRow> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, albumCover }) => (
      <TitleWrapper>
        <FallbackImage
          className="album-cover"
          image={albumCover}
          alt={`${name} album cover`}
        >
          <FallbackImage.NoteIcon size="sm" />
        </FallbackImage>
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
