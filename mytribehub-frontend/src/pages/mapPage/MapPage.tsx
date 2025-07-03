import React, { useState } from "react";
import Map from "../../components/mapComponent/Map";
import MapSideBar from "../../components/mapComponent/MapSideBar";

// Responsive MapPage with Map and MapSideBar components. MapSideBar is hidden on mobile and toggled by a button. Theme colors are used throughout.
const MapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-white">
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden flex justify-center p-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded shadow"
          onClick={() => setSidebarOpen(true)}
        >
          Browse Nearby
        </button>
      </div>
      <div className="flex flex-1 w-full">
        {/* Sidebar: hidden on mobile, visible on md+; overlay on mobile when open */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:static md:bg-transparent md:w-1/4 ${
            sidebarOpen ? "block" : "hidden"
          } md:block`}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className=" w-100%  md:w-full h-full bg-white md:rounded-none rounded-r-lg shadow-lg md:shadow-none p-4 md:static absolute left-0 top-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button on mobile */}
            <div className="flex justify-end md:hidden mb-2">
              <button
                className="text-primary text-2xl font-bold"
                onClick={() => setSidebarOpen(false)}
              >
                ×
              </button>
            </div>
            <MapSideBar />
          </div>
        </div>
        {/* Map: always visible, takes 2/3 on desktop, full on mobile */}
        <div className="flex-1 md:w-2/3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
