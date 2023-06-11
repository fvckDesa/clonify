import { time, format } from "@utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  Columns,
  TitleContainer,
  Authors,
  DurationContainer,
} from "@components/CollectionList";

export interface TrackRow {
  title: { name: string; authors: string[] };
  duration: number;
}

export const columns: Columns<TrackRow> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, authors }) => (
      <TitleContainer>
        <div className="track-name">{name}</div>
        <Authors>{authors.join(", ")}</Authors>
      </TitleContainer>
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
