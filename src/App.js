import Dashboard from './components/pages/Dashboard'
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
// Submmision
import ListSubmission from './components/submission/ListSubmission';
import EditSubmission from './components/submission/EditSubmission';
import AddSubmission from './components/submission/AddSubmission';
import ViewSubmission from './components/submission/ViewSubmission';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="wrapper-content">
          <div className="px-3 px-md-5 my-5" id='container'>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
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
              <Route path='/submission' element={<ListSubmission />} />
              <Route path='/submission/add' element={<AddSubmission />} />
              <Route path='/submission/edit/:id' element={<EditSubmission />} />
              <Route path='/submission/:id' element={<ViewSubmission />} />
              {/* <Route path="*" element={<NotFound />}></Route> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
