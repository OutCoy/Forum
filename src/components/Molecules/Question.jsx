import styled from "styled-components";

const StyledQuestion = styled.main`
`;

const Question = ({data}) => {
  return (
    <StyledQuestion>
      <h2>{data.title}</h2>
      <p>{data.question}</p>
    </StyledQuestion>
  );
}
 
export default Question;