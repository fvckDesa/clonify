import type { Columns } from "./type";
import { ReactNode, useMemo } from "react";
import styled from "styled-components";
import { entries, values } from "@/utils/object";
import { cssUnit } from "@utils/cssUnits";
import { WithId } from "@/types/utils";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CollectionListProps<ColumnsDef extends object> {
  columns: Columns<ColumnsDef>;
  items: WithId<ColumnsDef>[];
  omitHeader?: boolean;
}

function DEFAULT_RENDER<T>(v: T): ReactNode {
  return <>{v}</>;
}

function CollectionList<ColumnsDef extends object>({
  columns,
  items,
  omitHeader = false,
}: CollectionListProps<ColumnsDef>) {
  const template = useMemo(
    () =>
      values(columns)
        .map(({ width = "1fr" }) => cssUnit(width))
        .join(" "),
    [columns]
  );

  return (
    <>
      {!omitHeader && (
        <ListHeader $columns={template}>
          <Column>#</Column>
          {entries(columns).map(([column, { header }]) => (
            <Column key={column}>
              {typeof header === "function" ? header() : header}
            </Column>
          ))}
        </ListHeader>
      )}
      <List>
        {items.map(({ id, ...row }, idx) => (
          <ListRow key={id} $columns={template}>
            <Column>
              <Index>{idx + 1}</Index>
              <PlayPauseIcon icon={faPlay} />
            </Column>
            {entries(columns).map(([column, { render = DEFAULT_RENDER }]) => (
              <Column key={column}>
                {render((row as ColumnsDef)[column as keyof ColumnsDef])}
              </Column>
            ))}
          </ListRow>
        ))}
      </List>
    </>
  );
}

const Row = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: 16px ${(props) => props.$columns};
  gap: 16px;
  width: 100%;
`;

const ListHeader = styled(Row)`
  height: 36px;
  padding: 0 32px;
  border-bottom: solid 1px hsla(0, 0%, 100%, 0.1);
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayText};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
`;

const ListRow = styled(Row)`
  height: 56px;
  padding: 0 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

const Column = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Index = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayText};
  opacity: 1;
  ${ListRow}:hover & {
    opacity: 0;
  }
`;

const PlayPauseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0;
  z-index: 1;
  ${ListRow}:hover & {
    opacity: 1;
  }
`;

export default CollectionList;
