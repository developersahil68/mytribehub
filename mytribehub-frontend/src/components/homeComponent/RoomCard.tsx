import React from "react";

interface RoomCardProps {
  image: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  amenities: string[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  name,
  price,
  location,
  rating,
  amenities,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-sky-100">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-md">
          <span className="text-sky-600 font-semibold text-sm">{price}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-sky-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 transition-all duration-200">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
