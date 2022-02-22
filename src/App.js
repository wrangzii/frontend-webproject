import Navbar from './components/Navbar'
import Login from './components/form/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/admin/Register';

import {
  BrowserRouter,
  Routes,
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
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <div className="container">
          <Routes>
            <Route path='/list-user' element={<ListUser />} />
            <Route path='/list-user/add' element={<AddUser />} />
            <Route path='/list-user/edit/:id' element={<EditUser />} />
            <Route path='/list-user/:id' element={<ViewUser />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
