import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizResultsRequest } from "../redux/features/quiz/quizSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const QuizResults = () => {
  const dispatch = useDispatch();
  const { quizResults, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuizResultsRequest());
  }, [dispatch]);
  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "instructor") {
      navigate("/assigned-courses");
    }
    if (role === "admin") {
      navigate("/");
    }
  }, [role, navigate]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Quiz Results</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {quizResults.map((result) => (
          <li key={result._id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold">{result.courseId.title}</h2>
            <p className="text-gray-600">Lesson: {result.lessonId.title}</p>
            <p className="text-gray-600">Score: {result.score}</p>
            <p className="text-gray-600">Feedback: {result.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResults;
