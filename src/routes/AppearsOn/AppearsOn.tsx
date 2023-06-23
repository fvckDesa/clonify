import styled from "styled-components";
import { useAppearsOnData } from "./useAppearsOnData";
import Section from "@components/Section";

function AppearsOn() {
  const { appearsOn } = useAppearsOnData();

  return (
    <Layout>
      <Section title="Appears On" items={appearsOn} />
    </Layout>
  );
}

export default AppearsOn;

const Layout = styled.div`
  padding: 36px 24px;
`;
