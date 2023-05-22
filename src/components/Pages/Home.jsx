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
  > a {
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
  > a:hover {
    background-color: #2384fc;
    color: #fff;
  }
  > div.allQuestions {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  align-items: center;
  > label {
    margin-right: 10px;
  }
  > select {
    align-self: center;
    border: none;
    padding: 5px 10px;
    background-color: #393b4e;
    color: #fff;
    cursor: pointer;
  }
`;

const Home = () => {
  const { logedUser } = useContext(UsersContext);
  const { questions, dataLoaded } = useContext(QuestionsContext);
  return (
    <StyledHome>
      <MainContent>
        <Filters>
          <label htmlFor="filters">Filter </label>
          <select name="filters" id="filters">
            <option className="check" value="">value1</option>
            <option value="">value2</option>
            <option value="">value3</option>
          </select>
        </Filters>
        {dataLoaded ? (
          <>
            <h1>Questions</h1>
            <Link to={logedUser ? "/askQuestion" : "/login"}>Ask Question</Link>
            <div className="allQuestions">
              {questions.map((question) => (
                <Question data={question} key={question.id} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Data is being loaded</h1>
            <p>Please wait...</p>
          </>
        )}
      </MainContent>
    </StyledHome>
  );
};

export default Home;
