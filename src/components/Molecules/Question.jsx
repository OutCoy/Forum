import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledQuestion = styled.div``;

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
