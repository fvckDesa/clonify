import styled from "styled-components";
import { useSearchData } from "./useSearchData";
import Section from "@/components/Section";
import CollectionList from "@components/CollectionList";
import { columns } from "./columns";

function Search() {
  const { artists, albums, playlists, tracks } = useSearchData();

  return (
    <Layout>
      <Title>Tracks</Title>
      <Tracks columns={columns} items={tracks.slice(0, 4)} omitHeader />
      <Section title="Artists" items={artists} inline />
      <Section title="Albums" items={albums} inline />
      <Section title="Playlists" items={playlists} inline />
    </Layout>
  );
}

export default Search;

const Layout = styled.div`
  padding: 0 24px;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Tracks = styled(CollectionList)`
  padding: 0 8px;
  margin-bottom: 25px;
`;
