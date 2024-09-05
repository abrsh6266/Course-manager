import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesRequest,
  enrollCourseRequest,
} from "../redux/features/course/courseSlice";
import { RootState } from "../redux/store";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const AvailableCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCoursesRequest());
  }, [dispatch]);

  const handleEnroll = (courseId: string) => {
    dispatch(enrollCourseRequest({ courseId }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
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
              <button
                onClick={() => handleEnroll(course._id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Enroll
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AvailableCourses;
