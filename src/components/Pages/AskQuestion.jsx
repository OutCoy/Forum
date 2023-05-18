import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import QuestionsContext from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";

const StyledAskQuestion = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const AskQuestion = () => {

  const navigate = useNavigate();

  const { logedUser } = useContext(UsersContext);
  const { QuestionsActionsType, setQuestions } = useContext(QuestionsContext);

  const validationSchema = Yup.object({
    title: Yup.string().required('Question has to have title.'),
    question: Yup.string().required('Type your question.')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      question: ''
    },
    validationSchema, validationSchema,
    onSubmit: values => {
      const newQuestion = {
        id: uuid(),
        userId: logedUser.id,
        ...values,
        rating: [],
        isEdited: false
      };
      setQuestions({
        type: QuestionsActionsType.add,
        data: newQuestion
      });
      navigate('/');
    }

  })

  return (
    <StyledAskQuestion>
      <h1>New Question form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Question Title</label>
          <input type="text" name="title" id="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
          {
            formik.touched.title && formik.errors.title && <p>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="question">Question</label>
          <textarea id="question" name="question" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.question}></textarea>
          {
            formik.touched.question && formik.errors.question && <p>{formik.errors.question}</p>
          }
        </div>
        <input type="submit" value="Ask" />
      </form>
    </StyledAskQuestion>
  );
}
 
export default AskQuestion;