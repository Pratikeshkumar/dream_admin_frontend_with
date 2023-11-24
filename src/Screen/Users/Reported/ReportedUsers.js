import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';

function ReportedUsers() {
  const generateReport = require('../../../apis/generate_report');
  const [reportData, setReportData] = useState([]);

  const generateReportvideo = async () => {
    try {
      const response = await generateReport.generateReport();
      console.log(response, "response");
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching videoReport:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    generateReportvideo();
  }, []);

  return (
    <IncludeSideBar>
      <div>
        <p>
          Here we are displaying the All reports.
        </p>
        {reportData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Reason</th>
                <th>Reporter ID/Email/Username</th>
                <th>Video ID</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.description}</td>
                  <td>{report.reason}</td>
                  <td>{report.reporterId}--{report.reportedUser.email}--{report.reportedUser.username}</td>
                  <td>{report.videoId}</td>
                  <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(report.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </IncludeSideBar>
  );
}

export default ReportedUsers;
