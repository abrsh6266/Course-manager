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
  });
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {loading && (
        <p>
          <LoadingComponent />
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <table className="table-auto text-xl w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="form-select mt-1 block w-full"
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
  );
};

export default AdminUsers;
