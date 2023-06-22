import React, { useEffect, useState } from "react";
import IndividualReport from "../components/IndividualReport";
import { useParams } from "react-router-dom";
import axios from "axios";

function IndividualReportPage() {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Individual Report Page</h1>
      <IndividualReport studentData={studentData} />
    </div>
  );
}

export default IndividualReportPage;
