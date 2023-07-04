import styled from "styled-components";
import { useColumns } from "./useColumns";
import Filters from "@components/Filters";
import { Link } from "react-router-dom";
import { Children, PropsWithChildren } from "react";

export interface SectionProps {
  className?: string;
}

const MIN_CARD_WIDTH = 155;
//const MAX_CARD_WIDTH = 245;

// TODO fix section inline render logic
// add -> max-width * n < width
// remove -> min-width * n > width

function Section({ className, children }: PropsWithChildren<SectionProps>) {
  return <Layout className={className}>{children}</Layout>;
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: auto;
`;

export interface SectionHeaderProps {
  redirect?: string;
}

function SectionHeader({
  redirect,
  children,
}: PropsWithChildren<SectionHeaderProps>) {
  return (
    <Header>
      <h2>
        {redirect ? (
          <UnderlineLink to={redirect}>{children}</UnderlineLink>
        ) : (
          <span>{children}</span>
        )}
      </h2>
      {redirect ? (
        <h3>
          <UnderlineLink to={redirect}>Show All</UnderlineLink>
        </h3>
      ) : null}
    </Header>
  );
}

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

export interface SectionContainerProps {
  inline?: boolean;
}

function SectionContainer({
  inline = false,
  children,
}: PropsWithChildren<SectionContainerProps>) {
  const { ref, numColumns } = useColumns<HTMLDivElement>(MIN_CARD_WIDTH);
  return (
    <Container data-cy="section-container" ref={ref} $numColumns={numColumns}>
      {Children.toArray(children).slice(0, inline ? numColumns : undefined)}
    </Container>
  );
}

const Container = styled.div<{
  $numColumns: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$numColumns}, 1fr);
  gap: 15px;
  width: 100%;
  margin-bottom: 36px;
`;

export default Object.assign(Section, {
  Header: SectionHeader,
  Filters,
  Container: SectionContainer,
});
