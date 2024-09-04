import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuizRequest,
  updateQuizRequest,
  deleteQuizRequest,
} from "../redux/features/course/courseSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const ManageQuiz = () => {
  const { lesson, course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(lesson?.quiz?.questions || []);
  const [isEditing, _] = useState(!!lesson?.quiz?.questions);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [] }]);
  };

  const handleSaveQuiz = () => {
    if (isEditing) {
      dispatch(
        updateQuizRequest({
          courseId: course?._id,
          lessonId: lesson?._id,
          questions,
        })
      );
    } else {
      dispatch(
        addQuizRequest({
          courseId: course?._id,
          lessonId: lesson?._id,
          questions,
        })
      );
    }
  };

  const handleDeleteQuiz = () => {
    dispatch(
      deleteQuizRequest({
        courseId: course?._id,
        lessonId: lesson?._id,
      })
    );
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!lesson) {
      navigate("/assigned-courses");
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Quiz
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <label className="block text-lg font-medium text-gray-700">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                setQuestions(
                  questions.map((q, i) =>
                    i === qIndex ? { ...q, questionText: e.target.value } : q
                  )
                )
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter question text"
              required
            />
            <div className="mt-4 space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option.optionText}
                    onChange={(e) =>
                      setQuestions(
                        questions.map((q, i) =>
                          i === qIndex
                            ? {
                                ...q,
                                options: q.options.map((opt, j) =>
                                  j === oIndex
                                    ? { ...opt, optionText: e.target.value }
                                    : opt
                                ),
                              }
                            : q
                        )
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter option text"
                    required
                  />
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      setQuestions(
                        questions.map((q, i) =>
                          i === qIndex
                            ? {
                                ...q,
                                options: q.options.map((opt, j) =>
                                  j === oIndex
                                    ? { ...opt, isCorrect: e.target.checked }
                                    : opt
                                ),
                              }
                            : q
                        )
                      )
                    }
                    className="h-5 w-5"
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() =>
                  setQuestions(
                    questions.map((q, i) =>
                      i === qIndex
                        ? {
                            ...q,
                            options: [
                              ...q.options,
                              { optionText: "", isCorrect: false },
                            ],
                          }
                        : q
                    )
                  )
                }
              >
                Add Option
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="btn btn-primary mt-4 w-full"
        >
          Add Question
        </button>
        <button
          onClick={handleSaveQuiz}
          className="btn btn-success mt-4 w-full"
        >
          {isEditing ? "Update Quiz" : "Save Quiz"}
        </button>
        {isEditing && (
          <button
            onClick={handleDeleteQuiz}
            className="btn btn-danger mt-4 w-full"
          >
            Delete Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageQuiz;
