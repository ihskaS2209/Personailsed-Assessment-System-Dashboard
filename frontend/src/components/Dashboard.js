import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; 

function Dashboard({ user }) {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome to the Dashboard, {user.name}!
      </h1>
      <h2 className="dashboard-role">User Role: {user.role}</h2>
      <p className="dashboard-description">
        Here, you can view and analyze assessment data, generate reports, and
        visualize student performance.
      </p>
      {user.role === "admin" && (
        <div>
          <h3 className="dashboard-action-title">Admin Actions</h3>
          <ul className="dashboard-action-list">
            <li>
              <Link to="/assessment" className="dashboard-action-link">
                Create Assessment
              </Link>
            </li>
            <li>
              <Link to="/reports" className="dashboard-action-link">
                Generate Reports
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user.role === "teacher" && (
        <div>
          <h3 className="dashboard-action-title">Teacher Actions</h3>
          <ul className="dashboard-action-list">
            <li>
              <Link to="/assessment" className="dashboard-action-link">
                Create Assessment
              </Link>
            </li>
            <li>
              <Link to="/reports" className="dashboard-action-link">
                Generate Reports
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user.role === "student" && (
        <div>
          <h3 className="dashboard-action-title">Student Actions</h3>
          <ul className="dashboard-action-list">
            <li>
              <Link
                to={`/individual-report/${user.id}`}
                className="dashboard-action-link"
              >
                View Individual Report
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
