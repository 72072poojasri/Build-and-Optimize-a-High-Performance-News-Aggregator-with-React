import React, { Suspense, lazy, useState } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const SkillGraph = lazy(() => import("./pages/SkillGraph"));

export default function App() {
  const [route, setRoute] = useState("dashboard");
  return (
    <div>
      <header>
        <div style={{ fontWeight: 700 }}>Partnr — News Aggregator</div>
        <nav className="nav">
          <button onClick={() => setRoute("dashboard")}>Dashboard</button>
          <button onClick={() => setRoute("skill")}>Skill Graph</button>
          <button onClick={() => setRoute("profile")}>Profile</button>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {route === "dashboard" && <Dashboard />}
          {route === "skill" && <SkillGraph />}
          {route === "profile" && <Profile />}
        </Suspense>
      </main>
    </div>
  );
}
