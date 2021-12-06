import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
       <Routes>
         <Route exact path='/' element={<Main/>} />
         <Route path='/recipe/:id' element={<RecipePage/>} />
       </Routes>
    </Router>
  );
}

export default App;
