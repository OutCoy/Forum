import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import QuestionPage from './components/Pages/QuestionPage';
import Login from './components/Pages/Login';
import AskQuestion from './components/Pages/AskQuestion';
import EditQuestion from './components/Pages/EditQuestion';
import Header from './components/Organisms/Header';
import Register from './components/Pages/Register';

const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/askQuestion' element={<AskQuestion />} />
        <Route path='/editQuestion/:id' element={<EditQuestion />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />}/>
        <Route path='/question/:id' element={<QuestionPage />}/>
      </Routes>
    </>
  );
}

export default App;
