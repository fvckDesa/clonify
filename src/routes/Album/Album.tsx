import styled from "styled-components";
import Section from "@components/Section";
import CollectionHeader from "@components/CollectionHeader";
import CollectionList from "@components/CollectionList";
import type { Columns } from "@components/CollectionList/type";

const columns: Columns<{ title: string; duration: number }> = {
  title: {
    header: "title",
    width: "4fr",
  },
  duration: {
    header: () => <DurationContainer>duration</DurationContainer>,
    width: { min: 120, max: "1fr" },
    render: (value) => <DurationContainer>{value}</DurationContainer>,
  },
};

function Album() {
  return (
    <Wrapper>
      <CollectionHeader
        title="Album"
        type="album"
        author="user"
        cover=""
        tracksNum={5}
        duration={10}
      />
      <CollectionList
        columns={columns}
        items={[{ title: "test", duration: 3000 }]}
      />
      <ArtistSection as={Section} title="other of Artist" inline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
`;

const DurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 16px;
`;

const ArtistSection = styled.div`
  margin-top: 48px;
`;

export default Album;
