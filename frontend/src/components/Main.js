import '../css/main.css'
import Login from './Login';
import Register from './Register'
import {useLocation} from 'react-router-dom';

function Main() {
  const location = useLocation();

  return (
    <div className="App w-100 h-100">
      <header className="m-auto w-50 d-flex justify-content-center">
          <img src='/pot.png' alt='' width="50px" height="50px"/>
          <h3 className="p-2">Recipe Lookup</h3>
      </header>
      {location.pathname !== '/register' && <Login />}
      {location.pathname === '/register' && <Register/>}
    </div>
  );
}

export default Main;
