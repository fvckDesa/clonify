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
    <div className={className}>
      {Children.toArray(children).map((children, idx) => (
        <Separator key={idx} $content={content} $space={space}>
          {children}
        </Separator>
      ))}
    </div>
  );
}

export default InlineList;

const Separator = styled.span<ToStyledProps<SeparatorInfo>>`
  &:not(:first-of-type) {
    margin-left: 5px;
  }

  &:not(:last-of-type)::after {
    margin-left: ${(props) => `${props.$space}px`};
    content: "${(props) => props.$content}";
  }
`;
