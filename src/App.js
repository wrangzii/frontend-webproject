// import Dashboard from './components/pages/Dashboard'
import Navbar from './components/Navbar'
// //Form
import Login from './components/form/Login';
import ForgotPassword from './components/form/ForgotPassword'
import ResetPassword from './components/form/ResetPassword';
//User
import ListUser from './components/users/admin/ListUser';
import AddUser from './components/users/admin/AddUser';
import EditUser from './components/users/admin/EditUser';
import ViewUser from './components/users/admin/ViewUser';
//Category
import ListCate from './components/categories/admin/ListCate';
import EditCate from './components/categories/admin/EditCate';
import AddCate from './components/categories/admin/AddCate';
import ViewCate from './components/categories/admin/ViewCate';
// Department
import ListDepart from './components/departments/admin/ListDepart';
import EditDepart from './components/departments/admin/EditDepart';
import AddDepart from './components/departments/admin/AddDepart';
import ViewDepart from './components/departments/admin/ViewDepart';
// Submmision
import ListSubmission from './components/submission/admin/ListSubmission';
import EditSubmission from './components/submission/admin/EditSubmission';
import AddSubmission from './components/submission/admin/AddSubmission';
// Idea
import ListIdea from './components/idea/ListIdea';
import ViewIdea from './components/idea/ViewIdea';
import AddIdea from './components/idea/AddIdea'
import EditIdea from './components/idea/EditIdea'

import NotFound from './components/NotFound';
import Profile from './components/pages/Profile';
import Terms from './components/Terms';
import Chart from "./components/Dashboard/Chart"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Cookies } from 'react-cookie';

function App() {
  const cookies = new Cookies()
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="wrapper-content container">
          <div className="px-3 px-md-5 my-5" id='container'>
            <Routes>
              {/* <Route exact path='/' element={<Dashboard />} /> */}
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/confirm_reset' element={<ResetPassword />} />
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
              <Route path='/dashboard' element={<Chart />} />
              <Route path='/profile' element={<Profile />} />
              {cookies.get("token") ? (
                <>
                  <Route exact path='/' element={<ListIdea />} />
                  <Route path='/add/:id' element={<AddIdea />} />
                  <Route path='/edit/:id' element={<EditIdea />} />
                  <Route path='/:id' element={<ViewIdea />} />
                </>
              ) : <Route path='/' element={<Login />} />}
              
              <Route path='/terms-and-condition' element={<Terms />} />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
