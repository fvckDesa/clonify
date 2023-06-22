import styled from "styled-components";
import PlayBtn, { PlayBtnProps } from "@components/PlayBtn";

export interface ActionsProps extends PlayBtnProps {
  className?: string;
}

function Actions({ className, ...playBtnProps }: ActionsProps) {
  return (
    <Layout className={className}>
      <PlayBtn {...playBtnProps} />
    </Layout>
  );
}

export default Actions;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
