import styled from "styled-components";
import { Link } from "react-router-dom";
import { spotifyApi } from "@service/spotify";

function Login() {
  return (
    <Container>
      <AuthLink to={spotifyApi.authUrl}>Login with Spotify</AuthLink>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AuthLink = styled(Link)`
  height: 40px;
  padding: 8px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: #fff;
`;
