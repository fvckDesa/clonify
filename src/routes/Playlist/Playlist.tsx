import styled from "styled-components";
import { usePlaylistData } from "./usePlaylistData";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import InlineList from "@components/InlineList";
import { time, format } from "@utils/time";
import { useMemo } from "react";
import { columns } from "./columns";
import Actions from "@components/Actions";

function Playlist() {
  const { playlist, tracks, duration } = usePlaylistData();

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

  return (
    <Layout>
      <PlaylistHeader cover={playlist.images[0].url} size={192}>
        <h3 className="type">
          {playlist.public ? "public" : "private"} playlist
        </h3>
        <h1 className="name">{playlist.name}</h1>
        <Info>
          <InlineList separator={{ content: "•", space: 5 }}>
            <Author>{playlist.owner.display_name ?? "Unknown"}</Author>
            <span>{playlist.followers.total} Likes</span>
            <span>{playlist.tracks.total} tracks</span>
          </InlineList>
          {","}
          <span className="duration">{durationStr}</span>
        </Info>
      </PlaylistHeader>
      <FullActions isPlaying={false} />
      <CollectionList columns={columns} items={tracks} />
    </Layout>
  );
}

export default Playlist;

const Layout = styled.div`
  padding: 24px;
  color: #fff;
`;

const PlaylistHeader = styled(CollectionHeader)`
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

const Author = styled.span`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FullActions = styled(Actions)`
  padding: 24px 0;
  width: 100%;
`;
