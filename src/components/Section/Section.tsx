import styled from "styled-components";
import { useColumns } from "./useColumns";
import Card from "@components/Card";

export interface SectionProps {
  title: string;
  className?: string;
  inline?: boolean;
}

const MIN_CARD_WIDTH = 157;

// TODO fix section inline render logic
// add -> max-width * n < width
// remove -> min-width * n > width

function Section({ title, className = "", inline = false }: SectionProps) {
  const { ref, numColumns } = useColumns<HTMLDivElement>(MIN_CARD_WIDTH);

  return (
    <Layout className={className}>
      <Header>
        <h2>{title}</h2>
        {inline ? <h3>show all</h3> : null}
      </Header>
      <Container data-cy="section-container" ref={ref} $numColumns={numColumns}>
        {Array.from({ length: inline ? numColumns : numColumns + 4 }).map(
          (_, idx) => (
            <Card key={idx} name="name" description="description" />
          )
        )}
      </Container>
    </Layout>
  );
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: auto;
  min-height: 300px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  text-transform: capitalize;
  & > h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  & > h3 {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${({ theme }) => `${theme.colors.primary}dd`};
  }
`;

interface ContainerProps {
  $numColumns: number;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$numColumns}, 1fr);
  gap: 15px;
  width: 100%;
`;

export default Section;