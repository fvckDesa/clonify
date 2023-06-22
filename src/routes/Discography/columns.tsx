import {
  Columns,
  DurationContainer,
  TitleContainer,
  AuthorsList,
  Author,
} from "@components/CollectionList";
import { PartialArtist } from "@/types/spotify";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { time, format } from "@utils/time";

export interface TrackRow {
  title: { name: string; authors: PartialArtist[] };
  duration: number;
}

export const columns: Columns<TrackRow> = {
  title: {
    header: "title",
    width: "4fr",
    render: ({ name, authors }) => (
      <TitleContainer>
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
