import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCoursesRequest, getCourseDetail } from "../redux/features/course/courseSlice";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchEnrolledCoursesRequest());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Enrolled Courses</h1>
      {loading && (
        <p>
          <LoadingComponent />
        </p>
      )}
      {error && <p>{error}</p>}
      <ul>
        {courses.length >= 1 &&
          courses.map((course) => (
            <li
              key={course._id}
              className="bg-white p-4 rounded-lg shadow mb-4"
            >
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
              <Link
                onClick={() => {
                  dispatch(getCourseDetail(course));
                }}
                to={`/instructor/courses/${course._id}`}
                className="text-indigo-500 hover:text-indigo-700 hover:underline mt-4 block"
              >
                View Lessons
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
