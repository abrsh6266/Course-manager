import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { addLessonRequest } from "../redux/features/course/courseSlice";
import { Lesson } from "../utils";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector(
    (state: RootState) => state.course
  );
  const [lessonData, setLessonData] = useState<Lesson>({
    title: "",
    content: "",
  });
  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseId) {
      dispatch(addLessonRequest({ courseId, lessonData }));
      setLessonData({ title: "", content: "" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{course?.title}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <ul className="space-y-4">
        {course?.lessons.map((lesson) => (
          <li key={lesson._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold">{lesson.title}</h3>
            <p className="text-gray-700">{lesson.content}</p>
            <Link
              to={`/instructor/courses/${courseId}/lessons/${lesson._id}/quiz`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Manage Quiz
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
        <form onSubmit={handleAddLesson} className="space-y-4">
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseDetails;
