import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  fetchInstructorCoursesRequest,
  getCourseDetail,
} from "../redux/features/course/courseSlice";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const InstructorCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );
  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "admin") {
      navigate("/");
    }
    if (role === "user") {
      navigate("/my-courses");
    }
  });
  useEffect(() => {
    dispatch(fetchInstructorCoursesRequest());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        My Courses
      </h1>

      {loading && (
        <div className="flex justify-center">
          <LoadingComponent />
        </div>
      )}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <Link
                onClick={() => {
                  dispatch(getCourseDetail(course));
                }}
                to={`/instructor/courses/${course._id}`}
                className="text-indigo-500 hover:text-indigo-700 hover:underline mt-4 block"
              >
                View Lessons
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
