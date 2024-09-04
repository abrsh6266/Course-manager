import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import AdminCourses from "./pages/CoursePage";
import CreateCourse from "./components/CreateCourse";
import Overview from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/ProfilePage";
import AdminUsers from "./pages/UserManagmentPage";
import InstructorCourses from "./pages/InstructorCoursePage";
import CourseDetails from "./pages/CourseDetails";
import ManageQuiz from "./pages/MangeQuiz";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/instructor/courses/lessons/quiz"
              element={
                <ProtectedRoute>
                  <ManageQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assigned-courses"
              element={
                <ProtectedRoute>
                  <InstructorCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
              path="/"
            />
            <Route
              element={
                <ProtectedRoute>
                  <AdminCourses />
                </ProtectedRoute>
              }
              path="/courses"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              }
              path="/create-course"
            />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
