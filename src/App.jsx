import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import QuestionPage from './components/Pages/QuestionPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/question/:id' element={<QuestionPage />}/>
      </Routes>
    </>
  );
}

export default App;
