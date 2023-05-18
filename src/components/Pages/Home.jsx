import { useContext } from "react";
import styled from "styled-components";
import QuestionsContext from "../../contexts/QuestionsContext";
import Question from "../Molecules/Question";
import { Link } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";

const StyledHome = styled.main`
  min-height: 100vh;
  background-color: #0b0e0f;
  color: #fff;
`;

const Home = () => {
  const { logedUser } = useContext(UsersContext);
  const { questions, dataLoaded } = useContext(QuestionsContext);
  return (
    <StyledHome>
      <div>
        <h1>Questions</h1>
        {dataLoaded ? (
          <>
          <Link to='/login'>Login</Link>
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
      </div>
    </StyledHome>
  );
};

export default Home;
