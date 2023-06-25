import styled from "styled-components";
import { useColumns } from "./useColumns";
import Card from "@components/Card";
import { SectionFilter, SectionItem } from "./types";
import { Link } from "react-router-dom";

export interface SectionProps<Filter> {
  title: string;
  items: SectionItem[];
  filters?: SectionFilter<Filter>[] | readonly SectionFilter<Filter>[];
  onFilterChange?: (filter: Filter) => void;
  activeFilter?: Filter;
  redirect?: string;
  className?: string;
  inline?: boolean;
}

const MIN_CARD_WIDTH = 155;
//const MAX_CARD_WIDTH = 245;

// TODO fix section inline render logic
// add -> max-width * n < width
// remove -> min-width * n > width

function Section<Filter = never>({
  title,
  items,
  filters,
  onFilterChange,
  activeFilter,
  redirect = "",
  className = "",
  inline = false,
}: SectionProps<Filter>) {
  const { ref, numColumns } = useColumns<HTMLDivElement>(MIN_CARD_WIDTH);

  const isRedirectEnable = inline && !!redirect;

  return (
    <Layout className={className}>
      <Header>
        <h2>
          {isRedirectEnable ? (
            <UnderlineLink to={redirect}>{title}</UnderlineLink>
          ) : (
            <span>{title}</span>
          )}
        </h2>
        {isRedirectEnable ? (
          <h3>
            <UnderlineLink to={redirect}>Show All</UnderlineLink>
          </h3>
        ) : null}
      </Header>
      {filters != undefined && (
        <Filters>
          {filters.map(({ text, filter }) => (
            <Label
              key={filter as string}
              $active={activeFilter === filter}
              onClick={() => onFilterChange?.(filter)}
            >
              {text}
            </Label>
          ))}
        </Filters>
      )}
      <Container data-cy="section-container" ref={ref} $numColumns={numColumns}>
        {items
          .slice(0, inline ? numColumns : items.length)
          .map(({ id, ...cardProps }) => (
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
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    text-transform: capitalize;
  }
`;

const UnderlineLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.button<{ $active: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 32px;
  background-color: ${({ $active }) => ($active ? "#fff" : "#ffffff12")};
  color: ${({ $active }) => ($active ? "#000" : "#fff")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "hsla(0, 0%, 100%, 0.9)" : "hsla(0, 0%, 100%, 0.1)"};
  }

  &::first-letter {
    text-transform: capitalize;
  }
`;

const Container = styled.div<{
  $numColumns: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$numColumns}, 1fr);
  gap: 15px;
  width: 100%;
  margin-bottom: 36px;
`;

export default Section;
