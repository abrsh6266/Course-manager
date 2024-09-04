import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import AdminCourses from "./pages/Home";
import CreateCourse from "./components/CreateCourse";
import Overview from "./pages/dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route element={<Overview />} path="/admin-dashboard" />
            <Route element={<AdminCourses />} path="/" />
            <Route element={<CreateCourse />} path="/create-course" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
