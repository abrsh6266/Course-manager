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
import AvailableCourses from "./pages/AvailableCourses";
import EnrolledCourses from "./pages/EnrolledCoursesPage";
import Quiz from "./pages/TakeQuizPage";
import QuizResults from "./pages/TakenQuizes";

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
              path="/available-courses"
              element={
                <ProtectedRoute>
                  <AvailableCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/courses/lessons/take-quiz"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <EnrolledCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/taken-quiz"
              element={
                <ProtectedRoute>
                  <QuizResults />
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
