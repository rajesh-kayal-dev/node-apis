import 'bootstrap/dist/css/bootstrap.min.css'
import User from './components/getUser/User.jsx';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddUser from "./components/addUser/addUser.jsx";
import { Toaster } from "react-hot-toast";
import UpdateUser from "./components/updateUser/updateUser.jsx";

const App = () => {
  return (
    <div className="container mt-5">
        <Toaster position='top--right' />
        <Router>
        <Routes>

            <Route path="/" element={<User />}></Route>
            <Route path="/add-user" element={<AddUser />}></Route>
            <Route path="/update-user/:id" element={<UpdateUser />}></Route>
        </Routes>
        </Router>

    </div>
  );
}

export default App;