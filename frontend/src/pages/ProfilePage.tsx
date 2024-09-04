import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchProfileRequest,
  updateProfileRequest,
} from "../redux/features/user/userSlice";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const Profile = () => {
  const dispatch = useDispatch();
  const { id, email, username, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileRequest());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (username && email) {
      setFormData({ email, username, password: "" });
    }
  }, [email, username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfileRequest({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        My Profile
      </h1>

      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingComponent />
        </div>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <FormInput
          type="text"
          label="Username"
          name="username"
          handleChange={handleChange}
          defaultValue={formData.username}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          handleChange={handleChange}
          defaultValue={formData.email}
        />
        <FormInput
          type="password"
          label="Password (leave blank to keep current password)"
          name="password"
          handleChange={handleChange}
          defaultValue={formData.password}
        />
        <div className="flex justify-end">
          <SubmitBtn text="Update Profile" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default Profile;
