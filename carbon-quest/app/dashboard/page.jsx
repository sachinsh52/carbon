"use client"

import EventCalender from "@/components/EventCalender";
import Profile from "@/components/Profile";
import { useEffect, useState } from "react";

export default function Dashboard() {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [])

  return (
    <div className="container pt-10 mx-auto">
      <div className="flex justify-center mb-10">
        <EventCalender />
      </div>
      {user && <Profile name={user.name} />}
    </div>
  );
}
