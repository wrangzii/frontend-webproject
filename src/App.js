import Home from './Home';
import Login from './components/pages/Login';
import ForgotPassword from './components/ForgotPassword';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
        <div className="authentication container">
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/forgot' element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
