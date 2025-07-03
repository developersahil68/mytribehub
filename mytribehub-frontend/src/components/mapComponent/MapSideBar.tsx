import React from "react";

const MapSideBar = () => {
  return (
    <div className="h-full w-100% max-w-full flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Browse nearby restaurants and hotels
      </h2>
      <div className="flex flex-col gap-4">
        {/* Restaurant placeholder */}
        <div className="bg-sky-50 border-l-4 border-primary rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-secondary mb-1">
            Sample Restaurant
          </h3>
          <p className="text-gray-600 text-sm">
            123 Main St, City
            <br />
            Open: 10am - 10pm
          </p>
        </div>
        {/* Hotel placeholder */}
        <div className="bg-sky-50 border-l-4 border-secondary rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-primary mb-1">
            Sample Hotel
          </h3>
          <p className="text-gray-600 text-sm">
            456 Hotel Ave, City
            <br />
            Open: 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapSideBar;
