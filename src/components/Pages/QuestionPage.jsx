import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import Answer from "../Molecules/Answer";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import LikesDislikes from "../Atoms/LikesDislikes";
import { BsPencilFill } from "react-icons/bs";

const StyledQuestionPage = styled.main`
  background-color: #0b0e0f;
  min-height: calc(100vh - 175px);
  color: #fff;
`;

const QuestionPageContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionContent = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
  padding: 25px 15px;
  box-sizing: border-box;
  width: 100%;
  > div.options {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > a,
    > button {
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      background-color: #35d100;
      cursor: pointer;
    }
    > a {
      background-color: #35d100;
      text-decoration: none;
      color: #000;
    }
    > a:hover,
    > button:hover {
      background-color: #2384fc;
      color: #fff;
    }
    > button {
      background-color: red;
    }
  }
  .question {
    flex: 1 1;
    > * {
      margin: 0;
      text-align: justify;
    }
    > h1 {
      color: #35d100;
    }
    > p {
      margin-top: 20px;
      font-size: 1.1rem;
      white-space: pre-wrap;
      width: 100%;
      > svg {
        margin-left: 20px;
      }
    }
  }
  > div:first-of-type {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    > svg:hover {
      color: #2384fc;
    }
    > h3 {
      padding-bottom: 2px;
      margin: 10px 0;
    }
  }
`;

const QuestionAnswers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px 0;
  box-sizing: border-box;
  width: 100%;
`;

const StyledAnswerQuestion = styled.div`
  background-color: #282e30;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  > form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      > label {
        font-size: 1.2rem;
      }
    }
    textarea {
      font-size: 1rem;
      width: 100%;
      resize: none;
      border: none;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #34d10014;
      color: #fff;
    }
    textarea:not(:empty) {
      height: 500px;
    }
    > p {
      margin: 0;
      color: red;
      text-align: center;
      font-size: 1rem;
    }
    > input {
      align-self: center;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #35d100;
      font-size: 1.1rem;
      cursor: pointer;
    }
    > input:hover {
      color: #fff;
      background-color: #2384fc;
    }
  }
`;

const StyledModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000dc;
  display: flex;
  left: 0;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  z-index: 10;
  > h2 {
    font-size: 1.7rem;
    margin: 0;
  }
  > div {
    margin-top: 10px;
    display: flex;
    gap: 20px;
    > button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      background-color: #35d100;
      cursor: pointer;
    }
    > button:hover {
      color: #fff;
      background-color: #2384fc;
    }
  }
`;

const QuestionPage = () => {
  const [emptyAnswer, setEmptyAnswer] = useState(false);
  const [toDeleteQuestion, setToDeleteQuestion] = useState(false);
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
    onSubmit: (values) => {
      if (values.answer === "") {
        setEmptyAnswer(true);
        setTimeout(() => {
          setEmptyAnswer(false);
        }, 3000);
      } else {
        const newAnswer = {
          id: uuid(),
          questionId: id,
          userId: logedUser.id,
          answer: values.answer,
          rating: [],
          isEdited: false,
        };
        setAnswers({
          type: AnswersActionsType.add,
          data: newAnswer,
        });
        formik.resetForm();
      }
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
      {toDeleteQuestion && (
        <StyledModal>
          <h1>Are you sure you want to delete it?</h1>
          <div>
            <button onClick={() => deleteQuestion()}>Yes</button>
            <button onClick={() => setToDeleteQuestion(false)}>No</button>
          </div>
        </StyledModal>
      )}
      <QuestionPageContent>
        {data ? (
          <>
            <QuestionContent>
              <LikesDislikes
                data={data}
                setMethod={setQuestions}
                setActionType={QuestionsActionsType}
                className="ratings"
              />
              <div className="question">
                <h1>{data.title}</h1>
                <p>
                  {data.question} {data.isEdited && <BsPencilFill />}
                </p>
              </div>
              {data.userId === logedUser?.id && (
                <div className="options">
                  <button onClick={() => setToDeleteQuestion(true)}>
                    Delete
                  </button>
                  <Link to={`/editQuestion/${id}`}>Edit</Link>
                </div>
              )}
            </QuestionContent>
            {logedUser && (
              <StyledAnswerQuestion>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="answer">Answer</label>
                    <textarea
                      name="answer"
                      id="answer"
                      placeholder="Type your answer here..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.answer}
                    ></textarea>
                  </div>
                  <input type="submit" value="Add answer" />
                  {emptyAnswer && (
                    <p>You need to type your answer before publishing it.</p>
                  )}
                </form>
              </StyledAnswerQuestion>
            )}
            <QuestionAnswers>
              {filteredAnswers.map((answer) => (
                <Answer data={answer} key={answer.id} />
              ))}
            </QuestionAnswers>
          </>
        ) : (
          <>
            <h1>Data is being loaded</h1>
            <p>Please wait...</p>
          </>
        )}
      </QuestionPageContent>
    </StyledQuestionPage>
  );
};

export default QuestionPage;
