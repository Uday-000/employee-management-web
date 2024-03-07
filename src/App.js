import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HomeFrom } from "./pages/HomeForm";
import LoginForm from "./pages/LoginForm";
import UploadingFile from './pages/UploadingFile';
import RegistrationForm from './componet/RegistrationForm';
// import ReduxForm from './pages/ReduxForm';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}></Route>
          <Route path="/Home" element={<HomeFrom/>}>
          </Route>
          <Route path='/uploadFile' element={<UploadingFile/>} ></Route>
          <Route path='/Registration' element={<RegistrationForm/>} ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />

       {/* <ReduxForm/>  */}

      
      
    </div>
  );
}

export default App;
