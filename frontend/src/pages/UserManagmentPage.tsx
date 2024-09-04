import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchUsersRequest,
  updateUserRoleRequest,
} from "../redux/features/user/userSlice";
import LoadingComponent from "../components/Alerts/LoadingComponent";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleRoleChange = (userId: string, role: string) => {
    dispatch(updateUserRoleRequest({ id: userId, role }));
  };

  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "instructor") {
      navigate("/assigned-courses");
    }
    if (role === "user") {
      navigate("/my-courses");
    }
  }, [role, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">
        Manage Users
      </h1>

      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingComponent />
        </div>
      )}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-indigo-600 text-white text-lg">
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="block w-full mt-1 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="user">User</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
