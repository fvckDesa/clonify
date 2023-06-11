import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useScrollRestoration } from "@hooks/useScrollRestoration";

function AppLayout() {
  const pageRef = useScrollRestoration();

  return (
    <Layout>
      <MainContainer ref={pageRef}>
        <Outlet />
      </MainContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 8px;
  background-color: #000;
`;

const MainContainer = styled.main`
  padding: 0 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-y: auto;
`;

export default AppLayout;
