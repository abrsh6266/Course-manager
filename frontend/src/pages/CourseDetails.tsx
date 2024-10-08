import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  addLessonRequest,
  getLessonDetail,
} from "../redux/features/course/courseSlice";
import { Lesson } from "../utils";
import { getQuizRequest } from "../redux/features/quiz/quizSlice";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch course, user role, and other state variables from Redux
  const { course, loading, error } = useSelector(
    (state: RootState) => state.course
  );
  const { role } = useSelector((state: RootState) => state.user);

  const [lessonData, setLessonData] = useState<Lesson>({
    title: "",
    content: "",
  });

  // Handle adding new lesson for instructors
  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseId) {
      dispatch(addLessonRequest({ courseId, lessonData }));
      setLessonData({ title: "", content: "" });
    }
  };

  useEffect(() => {
    if (!course) {
      navigate("/assigned-courses");
    }
  }, [course, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">
        {course?.title}
      </h1>

      {/* Display loading or error messages */}
      {loading && (
        <div className="flex justify-center">
          <div className="loader"></div>{" "}
          {/* Replace with a spinner component */}
        </div>
      )}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Lessons Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Lessons</h2>
        <ul className="space-y-6">
          {course?.lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mt-2">{lesson.content}</p>

              {/* Conditionally render "Manage Quiz" for instructors and "Take Quiz" for users */}
              {role === "instructor" ? (
                <Link
                  onClick={() => dispatch(getLessonDetail(lesson))}
                  to={`/instructor/courses/lessons/quiz`}
                  className="text-indigo-500 hover:text-indigo-700 hover:underline mt-4 inline-block"
                >
                  Manage Quiz
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    dispatch(getQuizRequest(lesson.quiz || null));
                    dispatch(getLessonDetail(lesson));
                  }}
                  to={`/user/courses/lessons/take-quiz`}
                  className="text-green-500 hover:text-green-700 hover:underline mt-4 inline-block"
                >
                  Take Quiz
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {role === "instructor" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Add New Lesson
          </h2>
          <form onSubmit={handleAddLesson} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lesson Title
              </label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) =>
                  setLessonData({ ...lessonData, title: e.target.value })
                }
                className="mt-2 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lesson Content
              </label>
              <textarea
                value={lessonData.content}
                onChange={(e) =>
                  setLessonData({ ...lessonData, content: e.target.value })
                }
                className="mt-2 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                rows={6}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Lesson"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
