import styled from "styled-components";

const StyledNotFoundPage = styled.main`
  min-height: calc(100vh - 175px);
  background-color: #0b0e0f;
  color: #fff;
`;

const NotFoundContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
  >h1{
    font-size: 5rem;
  }
  >p{
    font-size: 2rem;
  }
`;

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <NotFoundContent>
        <h1>404</h1>
        <p>Page was not found</p>
      </NotFoundContent>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
