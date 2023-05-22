import { useFormik } from "formik";
import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import LikesDislikes from "../Atoms/LikesDislikes";

const StyledAnswer = styled.div`
  display: flex;
  position: relative;
  background-color: #282e30;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 5px;
  gap: 20px;
  > div.edit {
    display: flex;
    gap: 20px;
    align-items: center;
    > form {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      > textarea {
        resize: none;
        height: 300px;
        border: 1px solid #2384fc;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        background-color: #282e30;
        color: #fff;
        font-size: 1rem;
      }
      > textarea:focus {
        outline: 1px solid #35d100;
      }
      > input {
        align-self: center;
        border: none;
        padding: 10px 20px;
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
    > svg {
      color: red;
      cursor: pointer;
    }
    > svg:hover {
      color: #2384fc;
    }
  }
  > div:first-of-type {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    > h3 {
      padding-bottom: 2px;
      margin: 10px 0;
    }
  }
  > div:last-of-type {
    flex: 1;
    > p {
      min-height: 60px;
      text-align: justify;
      margin: 0 0 10px 0;
      white-space: pre-wrap;
      > svg {
        margin-left: 20px;
      }
    }
  }
  .options {
    display: flex;
    justify-content: space-between;
    > button {
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      background-color: #35d100;
      cursor: pointer;
    }
    > button:hover {
      background-color: #2384fc;
      color: #fff;
    }
    > svg {
      color: red;
      cursor: pointer;
    }
    > svg:hover {
      color: #2384fc;
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

const Answer = ({ data }) => {
  const [toEdit, setToEdit] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const { logedUser } = useContext(UsersContext);
  const { setAnswers, AnswersActionsType } = useContext(AnswersContext);
  const formik = useFormik({
    initialValues: { answer: data.answer },
    onSubmit: (values) => {
      if (values.answer === "" || !values.answer.replace(/\s/g, "").length) {
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
          <p>
            {data.answer}
            {data.isEdited && <BsPencilFill />}
          </p>
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
