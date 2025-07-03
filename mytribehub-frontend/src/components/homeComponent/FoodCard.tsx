import React from "react";

interface FoodCardProps {
  image: string;
  name: string;
  country: string;
  description: string;
  price: string;
  rating: number;
}

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  name,
  country,
  description,
  price,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-sky-100">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 left-3 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {country}
        </div>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-md">
          <span className="text-sky-600 font-semibold text-sm">{price}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4">
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
            <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 transition-all duration-200">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
