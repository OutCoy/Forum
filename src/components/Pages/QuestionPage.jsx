import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import Answer from "../Molecules/Answer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

const StyledQuestionPage = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const StyledAnswerQuestion = styled.div``;

const QuestionPage = () => {
  const navigate = useNavigate();
  const { answers, setAnswers, AnswersActionsType } =
    useContext(AnswersContext);
  const { logedUser } = useContext(UsersContext);
  const { id } = useParams();
  const { questions, setQuestions, QuestionsActionsType } =
    useContext(QuestionsContext);
  const data = questions.find((question) => question.id === id);
  const filteredAnswers = answers.filter((answer) => answer.questionId === id);

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema: Yup.object({
      answer: Yup.string().required(
        "You need to type your answer bedore publishing it."
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      const newAnswer = {
        id: uuid(),
        questionId: id,
        userId: logedUser.id,
        answer: values.answer,
        rating: [],
        isEdited: false,
      };
      console.log(newAnswer);
      setAnswers({
        type: AnswersActionsType.add,
        data: newAnswer,
      });
      formik.resetForm();
    },
  });

  const deleteQuestion = () => {
    setQuestions({
      id: id,
      type: QuestionsActionsType.del,
    });
    navigate("/");
  };

  return (
    <StyledQuestionPage>
      {
        data ? <>
        {data.userId === logedUser?.id && (
        <>
          <Link to={`/editQuestion/${id}`}>Edit</Link>
          <button onClick={() => deleteQuestion()}>Delete</button>
        </>
      )}
      <h1>{data.title}</h1>
      <p>{data.question}</p>
      <div>
        {filteredAnswers.map((answer) => (
          <Answer data={answer} key={answer.id} />
        ))}
      </div>
      {logedUser && (
        <StyledAnswerQuestion>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="answer">Answer</label>
            <textarea
              name="answer"
              id="answer"
              placeholder="Type your answer here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
            ></textarea>
            <input type="submit" value="Add answer" />
            {formik.touched.answer && formik.errors.answer && (
              <p>{formik.errors.answer}</p>
            )}
          </form>
        </StyledAnswerQuestion>
      )}
        </> : <>
        <h1>Data is being loaded</h1>
        <p>Please wait...</p></>
      }
    </StyledQuestionPage>
  );
};

export default QuestionPage;
