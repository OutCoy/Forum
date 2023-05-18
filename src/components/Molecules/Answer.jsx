import { useFormik } from "formik";
import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";

const StyledAnswer = styled.div``;

const Answer = ({ data }) => {

  const [toEdit, setToEdit] = useState(false);
  const {logedUser} = useContext(UsersContext);
  const { setAnswers, AnswersActionsType } = useContext(AnswersContext);
  const formik = useFormik({
    initialValues: {answer: data.answer},
    onSubmit: values => {
      setAnswers({
        id: data.id,
        type: AnswersActionsType.edit,
        data: {...data, answer: values.answer, isEdited: true}
      })
      setToEdit(false);
    }
  })

  return (
    <StyledAnswer>
      {
        toEdit ? 
        <form onSubmit={formik.handleSubmit}>
          <input type="text" id="answer" name="answer" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.answer}/>
          <input type="submit" value="Save"/>
        </form>
        :
        <>
          <p>{data.answer}</p>
          {
            logedUser?.id === data.userId && <button onClick={() => setToEdit(true)}>Edit</button>
          }
        </>
      }
    </StyledAnswer>
  );
}
 
export default Answer;