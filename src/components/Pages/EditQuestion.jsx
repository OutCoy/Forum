import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useFormik } from "formik";
import * as Yup from 'yup';

const StyledEditQuestion = styled.main`
background-color: #0b0e0f;
min-height: 100vh;
color: #fff;
`;

const EditQuestion = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { questions, setQuestions, QuestionsActionsType } = useContext(QuestionsContext);
  const data = questions.find(question => question.id === id);

  const validationSchema = Yup.object({
    title: Yup.string().required('Question title can not be empty.'),
    question: Yup.string().required('Question can not be empty.')
  })

  const formik = useFormik({
    initialValues: {
      title: data.title,
      question: data.question
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const editedQuestion = {
        id: data.id,
        userId: data.userId,
        title: values.title,
        question: values.question,
        rating: data.rating,
        isEdited: true
      }
      setQuestions({
        id: data.id,
        type: QuestionsActionsType.edit,
        data: editedQuestion
      });
      navigate('/');
    }
  })

  return (
    <StyledEditQuestion>
      <h1>Edit Question</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Question Title</label>
          <input type="text" id="title" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
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
        <input type="submit" value="Edit" />
      </form>
    </StyledEditQuestion>
  );
}
 
export default EditQuestion;