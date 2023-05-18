import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";

const StyledQuestionPage = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const QuestionPage = () => {

  const {logedUser} = useContext(UsersContext);
  const { id } = useParams();
  const { questions } = useContext(QuestionsContext);
  const data = questions.find(question => question.id === id);

  return (
    <StyledQuestionPage>
      {
        data.userId === logedUser.id && <Link to={`/editQuestion/${id}`}>Edit</Link>
      }
      <h1>{data.title}</h1>
    </StyledQuestionPage>
  );
}
 
export default QuestionPage;