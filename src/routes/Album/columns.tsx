import styled from "styled-components";
import { time, format } from "@utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Columns } from "@components/CollectionList";

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
        <Authors>
          {authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
        </Authors>
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

const DurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.grayText};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  & .track-name {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Authors = styled.div`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grayText};
  & > span:not(:last-child)::after {
    content: ",";
  }
`;
