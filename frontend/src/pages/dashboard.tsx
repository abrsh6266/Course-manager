import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchStatisticsRequest } from "../redux/features/statistics/statisticsSlice";
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const dispatch = useDispatch();
  const { totalUsers, totalCourses, totalEnrollments, recentActivity } =
    useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  // Transform the recentActivity data for the chart
  const data = {
    labels: recentActivity.map((activity) =>
      new Date(activity.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Enrollments",
        data: recentActivity.map((_, index) => index + 1),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Enrollment Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Enrollments",
        },
      },
    },
  };

  // Handle navigation based on user role
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
      <h1 className="text-4xl font-bold mb-8 text-indigo-600 text-center">
        Admin Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-5xl text-blue-500 mr-6" />
          <div>
            <h2 className="text-3xl font-bold">{totalUsers}</h2>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaBook className="text-5xl text-green-500 mr-6" />
          <div>
            <h2 className="text-3xl font-bold">{totalCourses}</h2>
            <p className="text-gray-600">Total Courses</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaClipboardList className="text-5xl text-red-500 mr-6" />
          <div>
            <h2 className="text-3xl font-bold">{totalEnrollments}</h2>
            <p className="text-gray-600">Total Enrollments</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Course Enrollment Over Time
        </h2>
        <Line data={data} options={options} />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <li key={index} className="py-4">
              <p className="text-lg text-gray-700">{activity.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
