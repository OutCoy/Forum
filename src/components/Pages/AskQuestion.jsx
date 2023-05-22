import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";

const StyledAskQuestion = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const AskQuestionContent = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin: 0 auto;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.2rem;
    gap: 25px;
    > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
      >input{
        background-color: #393b4e;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        color: #fff;
        font-size: 1rem;
      }
      > p {
        margin: 0;
        color: red;
        font-size: 1rem;
        padding: 0;
      }
      > textarea {
        width: 100%;
        height: 500px;
        resize: none;
        border: none;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        background-color: #393b4e;;
        border: 1px solid #2384fc;
        color: #fff;
        font-size: 1rem;
      }
      >textarea:focus, >input:focus{
          outline: 1px solid #35d100;
        }
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

const AskQuestion = () => {
  const navigate = useNavigate();

  const { logedUser } = useContext(UsersContext);
  const { QuestionsActionsType, setQuestions } = useContext(QuestionsContext);

  const validationSchema = Yup.object({
    title: Yup.string().required("Question has to have title."),
    question: Yup.string().required("Type your question."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      question: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newQuestion = {
        id: uuid(),
        userId: logedUser.id,
        ...values,
        rating: [],
        isEdited: false,
      };
      setQuestions({
        type: QuestionsActionsType.add,
        data: newQuestion,
      });
      navigate("/");
    },
  });

  return (
    <StyledAskQuestion>
      <AskQuestionContent>
        <h1>New Question form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="title">Question Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p>{formik.errors.title}</p>
            )}
          </div>
          <div>
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              name="question"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
            ></textarea>
            {formik.touched.question && formik.errors.question && (
              <p>{formik.errors.question}</p>
            )}
          </div>
          <input type="submit" value="Ask Question" />
        </form>
      </AskQuestionContent>
    </StyledAskQuestion>
  );
};

export default AskQuestion;
