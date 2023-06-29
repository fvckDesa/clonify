import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate } from "react-router-dom";
import { MouseEvent, useDeferredValue, useEffect, useState } from "react";

function SearchLayout() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/search/${encodeURIComponent(deferredQuery)}`);
  }, [navigate, deferredQuery]);

  function handlerClear(e: MouseEvent) {
    e.stopPropagation();
    setQuery("");
  }

  return (
    <Layout>
      <Header>
        <InputWrapper>
          <label htmlFor="search" />
          <input
            id="search"
            type="text"
            placeholder="What do you want listen ?"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <SearchIcon icon={faMagnifyingGlass} />
          {query.length > 0 && (
            <ClearBtn type="reset" onClick={handlerClear}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </ClearBtn>
          )}
        </InputWrapper>
      </Header>
      <Outlet />
    </Layout>
  );
}

export default SearchLayout;

const Layout = styled.div`
  position: relative;
  width: 100%;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  z-index: 10;
`;

const InputWrapper = styled.form`
  position: relative;
  isolation: isolate;
  height: 48px;
  padding: 6px 48px;
  border-radius: 500px;
  border: solid 2px transparent;
  margin: 0px 200px;
  background-color: #242424;
  color: #fff;
  transition: all 0.3s ease;

  &:hover,
  &:focus-within {
    background-color: #2a2a2a;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.2);
  }

  &:focus-within {
    border-color: #fff;
  }

  & input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #fff;
  }

  & input,
  & input::placeholder {
    font-size: 0.875rem;
    font-weight: 600;
    text-overflow: ellipsis;
  }

  & label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: text;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  padding: 16px;
  transform: translateY(-50%);
`;

const ClearBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 16px;
  background-color: transparent;
  color: #fff;
  z-index: 11;
  cursor: pointer;
`;
