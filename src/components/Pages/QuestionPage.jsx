import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import Answer from "../Molecules/Answer";

const StyledQuestionPage = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const QuestionPage = () => {

  const navigate = useNavigate();
  const {answers} = useContext(AnswersContext);
  const {logedUser} = useContext(UsersContext);
  const { id } = useParams();
  const { questions, setQuestions, QuestionsActionsType } = useContext(QuestionsContext);
  const data = questions.find(question => question.id === id);
  const filteredAnswers = answers.filter(answer => answer.questionId === id);
  console.log(filteredAnswers);

  const deleteQuestion = () =>{
    setQuestions({
      id: id,
      type: QuestionsActionsType.del,
    });
    navigate('/');
  }

  return (
    <StyledQuestionPage>
      {
        data.userId === logedUser?.id && <><Link to={`/editQuestion/${id}`}>Edit</Link><button onClick={() => deleteQuestion()}>Delete</button></>
      }
      <h1>{data.title}</h1>
      <p>{data.question}</p>
      <div>
        {
          filteredAnswers.map(answer => <Answer data={answer} key={answer.id}/>)
        }
      </div>
    </StyledQuestionPage>
  );
}
 
export default QuestionPage;