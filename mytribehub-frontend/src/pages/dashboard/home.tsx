import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RoomCard from "../../components/homeComponent/RoomCard";
import FoodCard from "../../components/homeComponent/FoodCard";
import TestimonialCard from "../../components/homeComponent/TestimonialCard";

const Home: React.FC = () => {
  // Sample data for rooms
  const affordableRooms = [
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      name: "Cozy Studio Apartment",
      price: "$45/night",
      location: "Downtown Area",
      rating: 4.2,
      amenities: ["WiFi", "Kitchen", "AC"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      name: "Budget Hotel Room",
      price: "$35/night",
      location: "City Center",
      rating: 3.8,
      amenities: ["WiFi", "TV", "Private Bath"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      name: "Shared Dormitory",
      price: "$25/night",
      location: "Student District",
      rating: 4.0,
      amenities: ["WiFi", "Lockers", "Common Kitchen"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      name: "Hostel Private Room",
      price: "$40/night",
      location: "Arts Quarter",
      rating: 4.1,
      amenities: ["WiFi", "Breakfast", "Laundry"],
    },
  ];

  const valueForMoneyRooms = [
    {
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
      name: "Premium Suite",
      price: "$120/night",
      location: "Business District",
      rating: 4.7,
      amenities: ["WiFi", "Gym", "Pool", "Spa"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      name: "Luxury Apartment",
      price: "$150/night",
      location: "Riverside",
      rating: 4.8,
      amenities: ["WiFi", "Balcony", "Kitchen", "Parking"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      name: "Boutique Hotel",
      price: "$180/night",
      location: "Historic Center",
      rating: 4.9,
      amenities: ["WiFi", "Restaurant", "Bar", "Concierge"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      name: "Executive Room",
      price: "$200/night",
      location: "Financial District",
      rating: 4.6,
      amenities: ["WiFi", "Business Center", "Fitness", "Breakfast"],
    },
  ];

  // Sample data for famous food
  const famousFood = [
    {
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      name: "Margherita Pizza",
      country: "Italy",
      description:
        "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil",
      price: "$18",
      rating: 4.8,
    },
    {
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      name: "Sushi Roll",
      country: "Japan",
      description: "Fresh salmon and avocado roll with premium rice and nori",
      price: "$24",
      rating: 4.9,
    },
    {
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      name: "Paella Valenciana",
      country: "Spain",
      description: "Traditional Spanish rice dish with seafood and saffron",
      price: "$32",
      rating: 4.7,
    },
    {
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      name: "Pad Thai",
      country: "Thailand",
      description:
        "Stir-fried rice noodles with eggs, tofu, and tamarind sauce",
      price: "$16",
      rating: 4.6,
    },
  ];

  // Sample data for affordable restaurants
  const affordableRestaurants = [
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      name: "Street Food Corner",
      country: "Vietnam",
      description: "Authentic Vietnamese street food with fresh ingredients",
      price: "$8-15",
      rating: 4.5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
      name: "Taco Truck",
      country: "Mexico",
      description: "Delicious Mexican tacos with homemade tortillas",
      price: "$6-12",
      rating: 4.4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
      name: "Kebab House",
      country: "Turkey",
      description: "Fresh grilled kebabs with traditional Turkish spices",
      price: "$10-18",
      rating: 4.3,
    },
    {
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
      name: "Curry Express",
      country: "India",
      description: "Spicy Indian curries with aromatic rice and naan",
      price: "$12-20",
      rating: 4.6,
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment:
        "MyTribeHub helped me find the perfect affordable accommodation during my backpacking trip. The community recommendations were spot on!",
    },
    {
      name: "Mike Chen",
      role: "Business Traveler",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment:
        "As a frequent business traveler, I love how MyTribeHub connects me with local experiences and authentic food spots.",
    },
    {
      name: "Emma Rodriguez",
      role: "Student",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4,
      comment:
        "Found amazing budget-friendly rooms and met fellow travelers through the platform. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                MyTribeHub
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with your tribe, share experiences, and build meaningful
              relationships in our vibrant community. Discover affordable
              accommodations, authentic local food, and unforgettable
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-3 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-sky-500 text-sky-600 px-8 py-3 rounded-lg font-medium hover:bg-sky-50 transition-all duration-200 hover:border-sky-600 hover:text-sky-700">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Travel Community"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">5K+</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Happy Travelers</p>
                  <p className="font-semibold text-gray-800">
                    Join our community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affordable Rooms Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Affordable Rooms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover comfortable and budget-friendly accommodations perfect
              for your next adventure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableRooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Value for Money Rooms Section */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Value for Money Rooms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium accommodations that offer exceptional value and
              unforgettable experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueForMoneyRooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Famous Food Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Famous Food
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Taste the world's most famous dishes from authentic local
              restaurants
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {famousFood.map((food, index) => (
              <FoodCard key={index} {...food} />
            ))}
          </div>
        </div>
      </section>

      {/* Affordable Restaurants Section */}
      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Affordable Restaurants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delicious meals at great prices from local favorites around the
              world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {affordableRestaurants.map((restaurant, index) => (
              <FoodCard key={index} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from travelers who have discovered amazing experiences
              through MyTribeHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
