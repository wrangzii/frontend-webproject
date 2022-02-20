import Login from './components/pages/Login';
import Admin from './components/admin/Admin';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Login />
        {/* <Admin /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
