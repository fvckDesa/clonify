import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";

type BtnSize = "sm" | "lg";

export interface PlayBtnProps {
  isPlaying: boolean;
  size?: BtnSize;
  className?: string;
  onClick?: () => void;
}

function PlayBtn({
  isPlaying,
  size = "sm",
  className = "",
  onClick,
}: PlayBtnProps) {
  function handlerClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    onClick?.();
  }

  return (
    <Button className={className} $size={size} onClick={handlerClick}>
      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
    </Button>
  );
}

const Button = styled.button<{ $size: BtnSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme, $size }) => theme.playBtn[$size]};
  height: ${({ theme, $size }) => theme.playBtn[$size]};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
  }
  & > svg {
    font-size: ${({ theme, $size }) =>
      `${parseInt(theme.playBtn[$size]) / 2}px`};
    transform: translateX(5%);
  }
`;

export default PlayBtn;
