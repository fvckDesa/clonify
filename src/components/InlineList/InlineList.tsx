import styled from "styled-components";
import { getSeparatorProps } from "./utils";
import type { SeparatorInfo } from "./types";
import type { ToStyledProps } from "@/types/utils";
import { Children, ReactNode } from "react";

export interface InlineListProps {
  separator: string | SeparatorInfo;
  className?: string;
  children?: ReactNode | ReactNode[];
}

function InlineList({ separator, className, children }: InlineListProps) {
  const { content, space } = getSeparatorProps(separator);

  return (
    <Container className={className}>
      {Children.toArray(children).map((children, idx) => (
        <Separator key={idx} $content={content} $space={space}>
          {children}
        </Separator>
      ))}
    </Container>
  );
}

export default InlineList;

const Container = styled.div`
  display: flex;
  gap: 5px;
`;

const Separator = styled.div<ToStyledProps<SeparatorInfo>>`
  &:not(:last-of-type):after {
    margin-left: ${(props) => `${props.$space}px`};
    content: "${(props) => props.$content}";
  }
`;
