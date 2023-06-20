import styled from "styled-components";
import { Link } from "react-router-dom";
import { getSeparatorProps } from "./utils";
import type { SeparatorInfo } from "./types";
import type { PartialArtist } from "@/types/spotify";
import type { ToStyledProps } from "@/types/utils";
import { MouseEvent } from "react";

export interface AuthorsProps {
  authors: PartialArtist[];
  separator: string | SeparatorInfo;
  className?: string;
}

function Authors({ authors, separator, className }: AuthorsProps) {
  const { content, space } = getSeparatorProps(separator);

  function handlerClick(e: MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Container className={className}>
      {authors.map(({ id, name }, idx) => (
        <div key={id}>
          <Author
            key={id}
            to={`/artist/${id}`}
            title={name}
            onClick={handlerClick}
          >
            {name}
          </Author>
          {idx < authors.length - 1 ? (
            <Separator $content={content} $space={space} />
          ) : null}
        </div>
      ))}
    </Container>
  );
}

export default Authors;

const Container = styled.div`
  display: flex;
  gap: 5px;
`;

export const Separator = styled.span<ToStyledProps<SeparatorInfo>>`
  margin-left: ${(props) => `${props.$space}px`};

  &::after {
    content: "${(props) => props.$content}";
  }
`;

const Author = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
