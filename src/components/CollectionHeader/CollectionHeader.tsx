import styled from "styled-components";
import { ReactNode } from "react";
export interface CollectionHeaderProps {
  cover: string;
  size: number;
  className?: string;
  children?: ReactNode | ReactNode[];
}

function CollectionHeader({
  cover,
  size,
  className,
  children,
}: CollectionHeaderProps) {
  return (
    <Header className={className}>
      <Cover src={cover} $size={size} />
      <TextContainer>{children}</TextContainer>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  gap: 24px;
`;

const Cover = styled.img<{ $size: number }>`
  align-self: flex-end;
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  height: auto;
`;

export default CollectionHeader;
