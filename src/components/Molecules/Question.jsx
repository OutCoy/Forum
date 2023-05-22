import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AnswersContext from "../../contexts/AnswersContext";

const StyledQuestion = styled.div`
  width: 100%;
  background-color: #1a1c2c;
  box-sizing: border-box;
  border-radius: 5px;
  height: 135px;
  overflow: hidden;
  > a {
    text-decoration: none;
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    padding: 10px 20px;
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    > div {
      text-align: justify;
      > p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > h2 {
        margin: 0 0;
        color: #35d100;
        width: 100%;
      }
      
    }
    >.info{
      >p{
        white-space: pre;
      }
    }
  }
  > a:hover {
    background-color: #2385fc45;
  }
`;

const Question = ({ data }) => {

  const { answers } = useContext(AnswersContext);


  return (
    <StyledQuestion>
      <Link to={`/question/${data.id}`}>
        <div className="content">
          <h2>{data.title}</h2>
          <p>{data.question}</p>
        </div>
        <div className="info">
          <p>{`Answers: ${answers.filter(answer => answer.questionId === data.id).length}`}</p>
          <p>{`Rating: ${data.rating.reduce((acc, curr) => acc + curr.value, 0)}`}</p>
        </div>
      </Link>
    </StyledQuestion>
  );
};

export default Question;
