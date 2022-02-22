import Navbar from './components/Navbar'
import Login from './components/form/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/admin/Register';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="authentication container">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/forgot' component={ForgotPassword} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
