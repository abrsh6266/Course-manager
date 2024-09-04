import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchInstructorsRequest } from "../redux/features/user/userSlice";
import { createCourseRequest } from "../redux/features/course/courseSlice";
import SubmitBtn from "../components/SubmitBtn";

const CreateCourse: React.FC = () => {
  const dispatch = useDispatch();
  const { instructors, loading: instructorLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { loading: courseLoading, error } = useSelector(
    (state: RootState) => state.course
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    instructor: "",
  });

  useEffect(() => {
    dispatch(fetchInstructorsRequest());
  }, [dispatch]);

  const validate = () => {
    let isValid = true;
    const newErrors = { title: "", description: "", instructor: "" };

    if (!formData.title) {
      newErrors.title = "Course title is required";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Course description is required";
      isValid = false;
    }

    if (!formData.instructor) {
      newErrors.instructor = "Instructor selection is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createCourseRequest(formData));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Create New Course</h2>
        
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="instructor">
              Instructor
            </label>
            <select
              id="instructor"
              name="instructor"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.instructor ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.instructor}
              onChange={handleChange}
            >
              <option value="">Select Instructor</option>
              {instructorLoading ? (
                <option disabled>Loading...</option>
              ) : (
                instructors?.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.username}
                  </option>
                ))
              )}
            </select>
            {errors.instructor && <p className="mt-1 text-sm text-red-500">{errors.instructor}</p>}
          </div>

          <div>
            <SubmitBtn text="Create Course" disabled={courseLoading} loading={courseLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
