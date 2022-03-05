import Home from './components/pages/Home'
import Navbar from './components/Navbar'
// //Form
import Login from './components/form/Login';
import ForgotPassword from './components/form/ForgotPassword'
import ResetPassword from './components/form/ResetPassword';
//User
import ListUser from './components/users/ListUser';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import ViewUser from './components/users/ViewUser';
//Category
import ListCate from './components/categories/ListCate';
import EditCate from './components/categories/EditCate';
import AddCate from './components/categories/AddCate';
import ViewCate from './components/categories/ViewCate';
// Department
import ListDepart from './components/departments/ListDepart';
import EditDepart from './components/departments/EditDepart';
import AddDepart from './components/departments/AddDepart';
import ViewDepart from './components/departments/ViewDepart';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="wrapper-content">
          <div className="px-3 px-md-5 my-5" id='container'>
            <Routes>
              <Route exact path='/' element={<Home />} >

              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/forgot' element={<ForgotPassword />} />
              <Route path='/reset' element={<ResetPassword />} />
              <Route path='/users' element={<ListUser />} />
              <Route path='/users/add' element={<AddUser />} />
              <Route path='/users/edit/:id' element={<EditUser />} />
              <Route path='/users/:id' element={<ViewUser />} />
              <Route path='/categories' element={<ListCate />} />
              <Route path='/categories/add' element={<AddCate />} />
              <Route path='/categories/edit/:id' element={<EditCate />} />
              <Route path='/categories/:id' element={<ViewCate />} />
              <Route path='/departments' element={<ListDepart />} />
              <Route path='/departments/add' element={<AddDepart />} />
              <Route path='/departments/edit/:id' element={<EditDepart />} />
              <Route path='/departments/:id' element={<ViewDepart />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
