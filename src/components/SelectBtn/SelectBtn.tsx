import styled from "styled-components";
import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  ReactNode,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { Item, Position } from "./types";

export interface SelectBtnProps<Value> {
  items: Item<Value>[] | readonly Item<Value>[];
  active: Value;
  onSelect: (value: Value) => void;
  className?: string;
  children?: ReactNode | ReactNode[];
}

function SelectBtn<Items extends string>({
  items,
  active,
  onSelect,
  className,
  children,
}: SelectBtnProps<Items>) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ top: 0, left: 0 });

  const repositionMenu = useCallback(() => {
    if (!btnRef.current) return;

    const { left, bottom } = btnRef.current.getBoundingClientRect();

    setPos({
      top: bottom,
      left,
    });
  }, []);

  useLayoutEffect(() => {
    if (!btnRef.current) return;

    repositionMenu();

    const observer = new ResizeObserver(() => repositionMenu());

    observer.observe(btnRef.current);

    return () => observer.disconnect();
  }, [btnRef, repositionMenu]);

  function handlerBtnClick() {
    setIsOpen(true);
  }

  function handlerClose(e: MouseEvent) {
    e.stopPropagation();
    setIsOpen(false);
  }

  return (
    <Button
      ref={btnRef}
      type="button"
      className={className}
      onClick={handlerBtnClick}
    >
      {children}
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      {isOpen &&
        createPortal(
          <Backdrop onClick={handlerClose}>
            <Menu $position={pos}>
              {items.map((item) => (
                <Item
                  key={item.value}
                  $active={item.value === active}
                  onClick={() => onSelect(item.value)}
                >
                  <span className="text">{item.text}</span>
                  {item.value === active ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <div />
                  )}
                </Item>
              ))}
            </Menu>
          </Backdrop>,
          document.getElementById("modal") as HTMLElement
        )}
    </Button>
  );
}

export default SelectBtn;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  cursor: pointer;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const Menu = styled.ul<{ $position: Position }>`
  position: absolute;
  transform: ${({ $position }) =>
    `translate3d(${$position.left}px, ${$position.top}px, 0px)`};
  max-width: 350px;
  min-width: 160px;
  padding: 4px;
  border-radius: 4px;
  margin-top: 5px;
  background-color: #282828;
`;

const Item = styled.li<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  padding-right: 8px;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : "#fff")};
  font-weight: 600;
  cursor: pointer;

  & .text::first-letter {
    text-transform: capitalize;
  }

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;
