import './App.css';
import './css/main.css'
import Main from './components/Main'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
       <Main />
       <Routes>
         <Route path='/' exact component={Main} />
       </Routes>
    </Router>
  );
}

export default App;
