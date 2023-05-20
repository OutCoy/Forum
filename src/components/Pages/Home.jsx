import { useContext } from "react";
import styled from "styled-components";
import QuestionsContext from "../../contexts/QuestionsContext";
import Question from "../Molecules/Question";
import { Link } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";

const StyledHome = styled.main`
  min-height: calc(100vh - 75px);
  background-color: #0b0e0f;
  color: #fff;
`;

const MainContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  >a{
    position: absolute;
    text-decoration: none;
    font-size: 1.1rem;
    color: #000;
    right: 20px;
    top: 20px;
    padding: 10px 20px;
    background-color: #35d100;
    border-radius: 5px;
  }
  >a:hover{
    background-color: #2384fc;
    color: #fff;
  }
  >div{
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
`;

const Home = () => {
  const { logedUser } = useContext(UsersContext);
  const { questions, dataLoaded } = useContext(QuestionsContext);
  return (
    <StyledHome>
      <MainContent>
        {dataLoaded ? (
          <>
          <h1>Questions</h1>
            {
              logedUser && <Link to='/askQuestion'>Ask Question</Link>
            }
            <div>
              {questions.map((question) => (
                <Question data={question} key={question.id} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Loading questions...</h1>
            <p>Please wait...</p>
          </>
        )}
      </MainContent>
    </StyledHome>
  );
};

export default Home;
