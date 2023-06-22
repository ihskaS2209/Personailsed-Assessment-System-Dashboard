import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";

function DashboardPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Dashboard user={userData} />
    </div>
  );
}

export default DashboardPage;
