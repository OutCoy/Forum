import { useFormik } from "formik";
import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import { BsFillTrash3Fill } from "react-icons/bs";
import LikesDislikes from "./LikesDislikes";

const StyledAnswer = styled.div``;

const StyledModal = styled.div``;

const Answer = ({ data }) => {
  const [toEdit, setToEdit] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const { logedUser } = useContext(UsersContext);
  const { setAnswers, AnswersActionsType } = useContext(AnswersContext);
  const formik = useFormik({
    initialValues: { answer: data.answer },
    onSubmit: (values) => {
      if (values.answer === "") {
        setToDelete(true);
      } else {
        setAnswers({
          id: data.id,
          type: AnswersActionsType.edit,
          data: { ...data, answer: values.answer, isEdited: true },
        });
        setToEdit(false);
      }
    },
  });

  const deleteAnswer = () => {
    setAnswers({
      type: AnswersActionsType.delete,
      id: data.id,
    });
  };

  return (
    <StyledAnswer>
      {toDelete && (
        <StyledModal>
          <h2>Are you sure you want to delete it?</h2>
          <div>
            <button
              onClick={() => {
                deleteAnswer();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setToDelete(false);
                formik.resetForm();
              }}
            >
              No
            </button>
          </div>
        </StyledModal>
      )}
      {toEdit ? (
        <>
          <BsFillTrash3Fill
            onClick={() => {
              setToDelete(true);
            }}
          />
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="answer"
              name="answer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
            />
            <input type="submit" value="Save" />
          </form>
        </>
      ) : (
        <>
          <p>{data.answer}</p>
          {logedUser?.id === data.userId && (
            <>
              <button onClick={() => setToEdit(true)}>Edit</button>
              <BsFillTrash3Fill
                onClick={() => {
                  setToDelete(true);
                }}
              />
            </>
          )}
        </>
      )}
      <LikesDislikes data={data} setMethod={setAnswers} setActionType={AnswersActionsType}/>
    </StyledAnswer>
  );
};

export default Answer;
