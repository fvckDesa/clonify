import styled from "styled-components";
import { Filter } from "./types";

export interface FiltersProps<F> {
  filters: Filter<F>[] | readonly Filter<F>[];
  onFilterChange: (filter: F) => void;
  activeFilter: F;
  className?: string;
}

function Filters<Filter>({
  filters,
  onFilterChange,
  activeFilter,
  className,
}: FiltersProps<Filter>) {
  return (
    <FiltersContainer className={className}>
      {filters.map(({ label, value }) => (
        <Label
          key={value as string}
          $active={activeFilter === value}
          onClick={() => onFilterChange?.(value)}
        >
          {label}
        </Label>
      ))}
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
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

export default Filters;
