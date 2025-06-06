import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { fetchDashboardData } from "../../utilityFunctions/apiCalls";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { getToken, isEducator } = useSelector(
    (state) => state.appContext.appData
  );

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData({token: getToken}).then(res => {
        setDashboardData(res)
      })
    }
  }, [isEducator]);

  return dashboardData ? (
    <div className="min-h-[90vh] flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-58 rounded-md">
            <img src={assets.patients_icon} />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentData.length}
              </p>
              <p className="text-base text-gray-500">Total Enrollments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-58 rounded-md">
            <img src={assets.appointments_icon} />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-58 rounded-md">
            <img src={assets.earning_icon} />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                ₹{dashboardData.totalEarnings}
              </p>
              <p className="text-base text-gray-500">Total Earning</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img src={item.student.imageUrl} className="w-8 h-8 rounded-full" />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-2 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
