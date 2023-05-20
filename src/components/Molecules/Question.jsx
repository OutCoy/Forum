import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledQuestion = styled.div`
  width: 100%;
  background-color: #1a1c2c;
  box-sizing: border-box;
  border-radius: 5px;
  height: 105px;
  overflow: hidden;
  >a{
    text-decoration: none;
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    padding: 0 20px;
    height: 100%;
    >p{
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    >h2{
      margin: 10px 0;
      width: 100%;
    }
  }
  >a:hover{
    background-color: #2385fc45;
  }
`;

const Question = ({ data }) => {
  return (
    <StyledQuestion>
      <Link to={`/question/${data.id}`}>
        <h2>{data.title}</h2>
        <p>{data.question}</p>
      </Link>
    </StyledQuestion>
  );
};

export default Question;
