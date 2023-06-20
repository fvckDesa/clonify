import styled from "styled-components";
import { time, format } from "@utils/time";
import { useMemo } from "react";
import Authors, { Separator } from "@components/Authors";
import { PartialArtist } from "@/types/spotify";

export interface CollectionHeaderProps {
  title: string;
  type: string;
  authors: PartialArtist[];
  cover: string;
  tracksNum: number;
  duration: number;
}

function CollectionHeader({
  title,
  type,
  authors,
  cover,
  tracksNum,
  duration,
}: CollectionHeaderProps) {
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

  const _type = useMemo(
    () => (type === "single" && tracksNum > 1 ? "EP" : type),
    [type, tracksNum]
  );

  return (
    <Header>
      <Cover src={cover} />
      <TextContainer>
        <h3 className="type">{_type}</h3>
        <h1 className="title">{title}</h1>
        <Info>
          <Authors authors={authors} separator={{ content: "•", space: 5 }} />
          <Separator $content="•" $space={0} />
          <span>{tracksNum} tracks</span>
          {","}
          <span className="duration">{durationStr}</span>
        </Info>
      </TextContainer>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  gap: 24px;
  height: clamp(340px, 30vh, 400px);
  padding: 24px 16px;
  padding-top: 0;
`;

const Cover = styled.img`
  align-self: flex-end;
  width: 192px;
  height: 192px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  height: 100%;
  & > .type {
    font-size: 0.875rem;
    text-transform: capitalize;
  }
  & > .title {
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

export default CollectionHeader;
