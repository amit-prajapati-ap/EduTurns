import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/student/Loading";
import {
  fetchEducatorCourses,
} from "../../utilityFunctions/apiCalls";

const MyCourses = () => {
  const [courses, setCourses] = useState(null);
  const token = useSelector((state) => state.appContext.appData.getToken);
  const isEducator = useSelector(
    (state) => state.appContext.appData.isEducator
  );

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses(token).then((res) => {
        setCourses(res);
      });
    }
  }, [isEducator]);

  return courses ? (
    <div className="min-h-[90vh] flex flex-col items-start justify-between md:p-8 md:pb-8 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="flex flex-col items-center max-w-4xl overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All Courses
                </th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Published On
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img src={course.courseThumbnail} className="w-16" />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    ₹
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
