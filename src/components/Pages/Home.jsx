import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import QuestionsContext from "../../contexts/QuestionsContext";
import Question from "../Molecules/Question";
import { Link } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";

const StyledHome = styled.main`
  min-height: calc(100vh - 75px);
  background-color: #0b0e0f;
  color: #fff;
`;

const MainContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  > a {
    position: absolute;
    text-decoration: none;
    font-size: 1.1rem;
    color: #000;
    right: 20px;
    top: 20px;
    padding: 10px 20px;
    background-color: #35d100;
    border-radius: 5px;
  }
  > a:hover {
    background-color: #2384fc;
    color: #fff;
  }
  > div.allQuestions {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    margin-bottom: 30px;
  }
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  align-items: center;
  > label {
    margin-right: 10px;
  }
  > select {
    align-self: center;
    text-align: center;
    border: none;
    padding: 5px 10px;
    background-color: #393b4e;
    color: #fff;
    cursor: pointer;
  }
`;

const Home = () => {
  const { logedUser } = useContext(UsersContext);
  const { questions, dataLoaded } = useContext(QuestionsContext);
  const { answers } = useContext(AnswersContext);
  const [sortType, setSortType] = useState("");
  const [data, setData] = useState(questions);

  useEffect(() => {
    switch (sortType) {
      case "ratingDown":
        const sortedRatingDown = [...questions].sort(
          (a, b) =>
            b.rating.reduce((acc, curr) => acc + curr.value, 0) -
            a.rating.reduce((acc, curr) => acc + curr.value, 0)
        );
        setData(sortedRatingDown);
        break;
      case "ratingUp":
        const sortedRatingUp = [...questions].sort(
          (a, b) =>
            a.rating.reduce((acc, curr) => acc + curr.value, 0) -
            b.rating.reduce((acc, curr) => acc + curr.value, 0)
        );
        setData(sortedRatingUp);
        break;
      case "answersDown":
        const sortedAnswersDown = [...questions].sort(
          (a, b) =>
            answers.filter((answer) => answer.questionId === b.id).length -
            answers.filter((answer) => answer.questionId === a.id).length
        );
        setData(sortedAnswersDown);
        break;
      case "answersUp":
        const sortedAnswersUp = [...questions].sort(
          (a, b) =>
            answers.filter((answer) => answer.questionId === a.id).length -
            answers.filter((answer) => answer.questionId === b.id).length
        );
        setData(sortedAnswersUp);
        break;
      case "notAnswered":
        const notAnsweredQuestions = [...questions].filter((question) => !(answers.find((answer) => answer.questionId === question.id)));
        setData(notAnsweredQuestions);
        break;
      case "answeredQuestions":
        const answeredQuestions = [...questions].filter((question) => (answers.find((answer) => answer.questionId === question.id)));
        setData(answeredQuestions);
        break;
      default:
        setData(questions);
    }
  }, [sortType, questions, answers]);

  return (
    <StyledHome>
      <MainContent>
        {dataLoaded ? (
          <>
            <Filters>
              <label htmlFor="filters">Filter </label>
              <select
                onChange={(e) => setSortType(e.target.value)}
                name="filters"
                id="filters"
              >
                <option value="">-- Select filter --</option>
                <option value="answersDown">Answers ↓</option>
                <option value="answersUp">Answers ↑</option>
                <option value="ratingDown">Rating ↓</option>
                <option value="ratingUp">Rating ↑</option>
                <option value="answeredQuestions">Only answered</option>
                <option value="notAnswered">Only not answered</option>
              </select>
            </Filters>
            <h1>Questions</h1>
            <Link to={logedUser ? "/askQuestion" : "/login"}>Ask Question</Link>
            <div className="allQuestions">
              {data.map((question) => (
                <Question data={question} key={question.id} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Data is being loaded</h1>
            <p>Please wait...</p>
          </>
        )}
      </MainContent>
    </StyledHome>
  );
};

export default Home;
