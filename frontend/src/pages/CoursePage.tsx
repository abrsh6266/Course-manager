import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchCoursesRequest,
  deleteCourseRequest,
} from "../redux/features/course/courseSlice";
import LoadingComponent from "../components/Alerts/LoadingComponent";
import { Link, useNavigate } from "react-router-dom";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCoursesRequest());
  }, [dispatch]);

  const handleDelete = (courseId: string) => {
    dispatch(deleteCourseRequest(courseId));
  };
  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "instructor") {
      navigate("/assigned-courses");
    }
    if (role === "user") {
      navigate("/my-courses");
    }
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Courses</h1>
      <Link className="btn m-4 text-2xl btn-primary" to={"/create-course"}>
        Create Course
      </Link>
      {loading && (
        <p className="text-center text-lg">
          <LoadingComponent />
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-4">
        {courses?.map((course) => (
          <li
            key={course._id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                  // Add your update/edit logic here
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;
