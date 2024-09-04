import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
