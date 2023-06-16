import styled from "styled-components";
import { useColumns } from "./useColumns";
import Card, { CardProps } from "@components/Card";
import { WithId } from "@/types/utils";

export interface SectionProps {
  title: string;
  items: WithId<CardProps>[];
  className?: string;
  inline?: boolean;
}

const MIN_CARD_WIDTH = 155;
//const MAX_CARD_WIDTH = 245;

// TODO fix section inline render logic
// add -> max-width * n < width
// remove -> min-width * n > width

function Section({
  title,
  items,
  className = "",
  inline = false,
}: SectionProps) {
  const { ref, numColumns } = useColumns<HTMLDivElement>(MIN_CARD_WIDTH);

  return (
    <Layout className={className}>
      <Header>
        <h2>{title}</h2>
        {inline ? <h3>show all</h3> : null}
      </Header>
      <Container data-cy="section-container" ref={ref} $numColumns={numColumns}>
        {items.slice(0, numColumns).map(({ id, ...cardProps }) => (
          <Card key={id} {...cardProps} />
        ))}
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

const Container = styled.div<{
  $numColumns: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$numColumns}, 1fr);
  gap: 15px;
  width: 100%;
`;

export default Section;
