import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Event, { EventDetail } from "../components/Event";
import {EventStatus} from "../enums/eventStatus";

const Hacks8: EventDetail = {
  eventName: "UGA Hacks 8",
  date: "02/05/2023",
  description: "lorem ipsum",
  page: "/events/hacks-8",
}
const events = [{e: <Event {...Hacks8}/>}]

const DashboardPage = () => {
    const { user, getFirstName, getRegisteredEvents } = useAuth();
    const [firstName, setFirstName] = useState('');



    useEffect(() => {
      async function get_first_name() {
        const first_name = await getFirstName();
        setFirstName(first_name)
      }

      get_first_name();
    }, []);

  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto">
        
        <div className="text-gray-600 px-12 py-24 mt-24 mx-auto">
          <h2 className="text-2xl font-semibold">Hey {firstName}, welcome to the UGA Hacks Portal!</h2>
          <h2 className="text-2x1 font-semibold">Pick an event from below!</h2>

            {events.map(data => (
              <button>{data.e}</button>
            ))}

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;