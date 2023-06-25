import styled from "styled-components";
import { useDiscographyData } from "./useDiscographyData";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import InlineList from "@components/InlineList";
import Actions from "@components/Actions";
import { columns } from "./columns";
import { getAlbumType } from "@utils/album";
import { useScroll } from "@/context/scroll";
import { Link, useNavigate, useParams } from "react-router-dom";
import { filters, Filter } from "./constants";
import SelectBtn from "@components/SelectBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Section from "@components/Section";
import { ViewMode } from "./types";

interface DiscographyProps {
  filter?: Filter;
}

function Discography({ filter = "all" }: DiscographyProps) {
  const navigate = useNavigate();
  const { artistId } = useParams<"artistId">();
  const { discography, discographyItems } = useDiscographyData(filter);
  const { top } = useScroll();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  function handlerSelect(filter: Filter) {
    navigate(`/artist/${artistId}/discography/${filter}`);
  }

  return (
    <Container>
      <Artist $isTop={top > 0}>
        <Link to={`/artist/${discography[0].artists[0].id}`}>
          {discography[0].artists[0].name}
        </Link>
        <div>
          <FilterBtn items={filters} active={filter} onSelect={handlerSelect}>
            {filter === "single" ? "single and EP" : filter}
          </FilterBtn>
          <CircularBtn
            $active={viewMode === "list"}
            onClick={() => setViewMode("list")}
          >
            <FontAwesomeIcon icon={faList} />
          </CircularBtn>
          <CircularBtn
            $active={viewMode === "section"}
            onClick={() => setViewMode("section")}
          >
            <FontAwesomeIcon icon={faGrip} />
          </CircularBtn>
        </div>
      </Artist>
      {viewMode === "list" ? (
        <DiscographyList>
          {discography.map(
            ({
              id,
              name,
              images,
              album_type,
              release_date,
              total_tracks,
              tracks,
            }) => (
              <li key={id}>
                <AlbumHeader cover={images[0].url} size={136}>
                  <Name>
                    <Link to={`/album/${id}`}>{name}</Link>
                  </Name>
                  <Info separator={{ content: "•", space: 5 }}>
                    <span>{getAlbumType(album_type, total_tracks)}</span>
                    <span>{release_date.getFullYear()}</span>
                    <span>{total_tracks} tracks</span>
                  </Info>
                  <Actions isPlaying={false} size="sm" />
                </AlbumHeader>
                <TackList columns={columns} items={tracks.items} />
              </li>
            )
          )}
        </DiscographyList>
      ) : (
        <DiscographySection title="" items={discographyItems} />
      )}
    </Container>
  );
}

export default Discography;

const Container = styled.div`
  position: relative;
`;

const Artist = styled.header<{ $isTop: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: ${({ $isTop }) =>
    $isTop ? "0 6px 10px rgba(0, 0, 0, 0.6)" : "0 0 0 rgb(0, 0, 0)"};
  z-index: 100;

  & a:hover {
    text-decoration: underline;
  }
`;

const FilterBtn = styled(SelectBtn<Filter>)`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const CircularBtn = styled.button<{ $active: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 100%;
  margin-left: 12px;
  background-color: ${({ theme, $active }) =>
    $active ? "#282828" : theme.colors.secondary};
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #282828;
  }
`;

const DiscographyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #fff;
`;

const DiscographySection = styled(Section)`
  padding: 0 24px;
`;

const AlbumHeader = styled(CollectionHeader)`
  display: flex;
  gap: 24px;
  padding: 32px;
`;

const Info = styled(InlineList)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayText};
  padding: 8px 0;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  & a:hover {
    text-decoration: underline;
  }
`;

const TackList = styled(CollectionList)`
  padding: 0 32px;
`;
