import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { takeQuizRequest } from "../redux/features/quiz/quizSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const Quiz = () => {
  const navigate = useNavigate();
  const { lesson, course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch();
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  // Initialize `answers` as an array of strings
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => {
    if (!quiz) {
      navigate("/my-courses");
    }
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      takeQuizRequest({ answers, courseId: course?._id, lessonId: lesson?._id })
    );
  };

  const handleAnswerChange = (questionIndex: number, optionText: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = optionText;
      return updatedAnswers;
    });
  };
  const role = useSelector((state: RootState) => state.user.role);
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
      <h1 className="text-3xl font-bold mb-6">Quiz</h1>
      {loading && (
        <p>
          <LoadingComponent />
        </p>
      )}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {quiz?.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{question.questionText}</h3>
            <ul className="space-y-2">
              {question.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.optionText}
                      onChange={() =>
                        handleAnswerChange(index, option.optionText)
                      }
                      className="form-radio"
                    />
                    <span className="ml-2">{option.optionText}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default Quiz;
