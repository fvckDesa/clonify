import styled from "styled-components";
import { useRelatedData } from "./useRelatedData";
import Section from "@components/Section";

function Related() {
  const { relatedArtists } = useRelatedData();

  return (
    <Layout>
      <Section title="Fans appreciate it too" items={relatedArtists} />
    </Layout>
  );
}

export default Related;

const Layout = styled.div`
  padding: 36px 24px;
`;
