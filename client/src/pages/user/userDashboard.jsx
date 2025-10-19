import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul@example.com",
    address: "A-204, Sunshine Apartments, Sector 15, Noida, Uttar Pradesh - 201301",
    primaryAddress: "A-204, Sunshine Apartments, Sector 15, Noida"
  });
  
  const [searchAddress, setSearchAddress] = useState(user.primaryAddress);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock vendors data
  const mockVendors = [
    {
      id: 1,
      name: "Pure Water Supplies",
      owner: "Mr. Rajesh Kumar",
      phone: "+91 9876543211",
      address: "Shop No. 5, Sector 15 Market, Noida",
      waterType: "Mineral Water 20L",
      price: "₹50",
      deliveryTime: "30-45 mins",
      distance: "2.5 km",
      rating: "4.5"
    },
    {
      id: 2, 
      name: "Aqua Fresh RO Water",
      owner: "Mr. Vikram Singh",
      phone: "+91 9876543212",
      address: "G-12, Sector 18, Near City Mall, Noida",
      waterType: "RO Purified Water 20L", 
      price: "₹40",
      deliveryTime: "45-60 mins",
      distance: "3.1 km",
      rating: "4.2"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setVendors(mockVendors);
      setLoading(false);
    }, 1000);
  };

  const handleOrderNow = (vendorId) => {
    navigate(`/payment/${vendorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
              <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>🏠</span>
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Water Suppliers Near You</h2>
          
          <form onSubmit={handleSearch}>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Enter your delivery address..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {searchAddress && (
            <p className="text-green-600">
              🔍 Searching suppliers near: <strong>{searchAddress}</strong>
            </p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-8">Finding water suppliers near you...</div>
        ) : (
          <div className="grid gap-6">
            {vendors.map(vendor => (
              <div key={vendor.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{vendor.name}</h3>
                        <p className="text-gray-600">Owner: {vendor.owner}</p>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{vendor.price}</span>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{vendor.address}</span>
                        <span className="text-blue-600 font-medium">({vendor.distance} away)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💧</span>
                        <span>{vendor.waterType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>Delivery: {vendor.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        ⭐ {vendor.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <button
                      onClick={() => handleOrderNow(vendor.id)}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold whitespace-nowrap"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {vendors.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8 bg-white rounded-xl">
            <p className="text-lg">Enter your delivery address to find water suppliers near you</p>
            <p className="text-sm mt-2">We'll show you all available vendors in your area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;