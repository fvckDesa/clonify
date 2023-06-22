import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useScrollRestoration } from "@hooks/useScrollRestoration";
import SideBar from "@components/Sidebar";
import { ScrollProvider } from "@/context/scroll";

function AppLayout() {
  const pageRef = useScrollRestoration();

  return (
    <Layout>
      <SideBar />
      <MainContainer ref={pageRef}>
        <ScrollProvider element={pageRef}>
          <Outlet />
        </ScrollProvider>
      </MainContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 8px;
  background-color: #000;
`;

const MainContainer = styled.main`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-y: auto;
`;

export default AppLayout;
