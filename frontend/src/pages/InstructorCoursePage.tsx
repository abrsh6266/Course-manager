import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  useEffect(() => {
    dispatch(fetchInstructorCoursesRequest());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Assigned Courses</h1>
      {loading && (
        <p>
          <LoadingComponent />
        </p>
      )}
      {error && <p>{error}</p>}
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <Link
              onClick={() => {
                dispatch(getCourseDetail(course));
              }}
              to={`/instructor/courses/${course._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Lessons
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorCourses;
