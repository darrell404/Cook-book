import './App.css';
import './css/main.css'
import Main from './components/Main'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RecipePage from './components/RecipePage';

function App() {
  return (
    <Router>
       <Routes>
         <Route path='/' exact element={<Main />} />
         <Route path='/recipe/:id' elemet={<RecipePage/>} />
       </Routes>
    </Router>
  );
}

export default App;
