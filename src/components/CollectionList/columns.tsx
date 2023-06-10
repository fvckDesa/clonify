import styled from "styled-components";

export const DurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.grayText};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  & .track-name {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Authors = styled.div`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grayText};
  & > span:not(:last-child)::after {
    content: ",";
  }
`;
