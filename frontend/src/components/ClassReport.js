import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function ClassReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get("/api/reports/class");
        setReportData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h2>Class Report</h2>
      {reportData ? (
        <Bar
          data={reportData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
}

export default ClassReport;
