import Navbar from './components/Navbar'
import Login from './components/form/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/admin/Register';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import ListUser from './components/users/ListUser';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import ViewUser from './components/users/ViewUser';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="authentication container">
<<<<<<< HEAD
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/forgot' element={<ForgotPassword />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/listuser' element={<ListUser />} />
            <Route exact path='/listuser/add' element={<AddUser />} />
            <Route exact path='/listuser/edit/:id' element={<EditUser />} />
            <Route exact path='/listuser/:id' element={<ViewUser />} />
          </Routes>
=======
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/forgot' component={ForgotPassword} />
            <Route path='/register' component={Register} />
          </Switch>
>>>>>>> 1829933245668452961f353126f7598bc6e414b5
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
