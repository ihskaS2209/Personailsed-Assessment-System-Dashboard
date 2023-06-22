import React, { useEffect, useState } from "react";
import axios from "axios";

function IndividualReport({ studentId }) {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          `/api/reports/individual/${studentId}`
        );
        setReportData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, [studentId]);

  return (
    <div>
      <h2>Individual Report</h2>
      {reportData ? (
        <div>
          <h3>Student: {reportData.studentName}</h3>
          <p>Class Average: {reportData.classAverage}</p>
          <p>Ideal Score: {reportData.idealScore}</p>
          {/* Render additional report data */}
        </div>
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
}

export default IndividualReport;
