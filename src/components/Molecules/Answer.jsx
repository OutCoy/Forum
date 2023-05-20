import { useFormik } from "formik";
import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import LikesDislikes from "../Atoms/LikesDislikes";

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
      if (values.answer === "" || !values.answer.replace(/\s/g, '').length) {
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
      <LikesDislikes
        data={data}
        setMethod={setAnswers}
        setActionType={AnswersActionsType}
      />
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
        <div className="edit">
          <form onSubmit={formik.handleSubmit}>
            <textarea
              id="answer"
              name="answer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
            />
            <input type="submit" value="Save" />
          </form>
          <BsFillTrash3Fill
          size={20}
            onClick={() => {
              setToDelete(true);
            }}
          />
        </div>
      ) : (
        <div>
          <p>{data.answer}{data.isEdited && <BsPencilFill />}</p>
          {logedUser?.id === data.userId && (
            <div className="options">
              <button onClick={() => setToEdit(true)}>Edit</button>
              <BsFillTrash3Fill
                size={20}
                onClick={() => {
                  setToDelete(true);
                }}
              />
            </div>
          )}
        </div>
      )}
    </StyledAnswer>
  );
};

export default Answer;
