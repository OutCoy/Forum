import { createContext, useEffect, useReducer, useState } from "react";

const QuestionsContext = createContext(null);

const QuestionsActionsType = {
  get: 'get_all_questions',
  add: 'add_new_question',
  edit: 'edit_question'
}

const reducer = (status, action) => {
  switch(action.type){
    case QuestionsActionsType.get:
      return action.data;
    case QuestionsActionsType.add:
      fetch('http://localhost:8080/questions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...status, action.data];
    case QuestionsActionsType.edit:
      fetch(`http://localhost:8080/questions/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return status.map(el => {
        if(el.id === action.id){
          return action.data;
        } else {
          return el;
        }
      });
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
        type: QuestionsActionsType.get,
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
        dataLoaded,
        QuestionsActionsType
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
 
export {QuestionsProvider};
export default QuestionsContext;