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

// Register the components for Chart.js
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

  // Sample data for the chart (you should replace this with real data)
  const data = {
    labels: recentActivity.map((activity) =>
      new Date(activity.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Enrollments",
        data: recentActivity.map((activity, index) => index + 1),
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
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaUsers className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaBook className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{totalCourses}</h2>
            <p className="text-gray-600">Total Courses</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-4xl text-red-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{totalEnrollments}</h2>
            <p className="text-gray-600">Total Enrollments</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Course Enrollment Over Time</h2>
        <Line data={data} options={options} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <li key={index} className="py-2">
              <p className="text-gray-600">{activity.description}</p>
              <p className="text-sm text-gray-400">
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
