import { createContext, useEffect, useReducer, useState } from "react";

const QuestionsContext = createContext(null);

const QuesitonsActionsType = {
  get: 'get_all_questions'
}

const reducer = (status, action) => {
  switch(action.type){
    case QuesitonsActionsType.get:
      return action.data;
    default:
      return status;
  }
}

const QuestionsProvider = ({children}) => {

  const [questions, setQuestions] = useReducer(reducer, []);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/questions').then(res => res.json()).then(data => {
      setQuestions({
        type: QuesitonsActionsType.get,
        data: data
      });
      setDataLoaded(true);
    });
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        dataLoaded
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
 
export {QuestionsProvider};
export default QuestionsContext;