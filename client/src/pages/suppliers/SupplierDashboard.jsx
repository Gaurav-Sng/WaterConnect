// pages/VendorDashboard.jsx
import { useState } from 'react';

const VendorDashboard = () => {
  const [vendor, setVendor] = useState({
    businessName: "Pure Water Supplies",
    ownerName: "Rajesh Kumar",
    phone: "+91 9876543211",
    email: "rajesh@purewaters.com",
    address: "Shop No. 5, Sector 15 Market, Noida, Uttar Pradesh - 201301",
    waterType: "Mineral Water",
    pricePer20L: "₹50",
    businessHours: "7:00 AM - 10:00 PM",
    gstNumber: "07AABCU9603R1ZM"
  });

  const [orders, setOrders] = useState([
    { 
      id: 1, 
      customer: "Rahul Sharma", 
      customerPhone: "+91 9876543210",
      address: "A-204, Sunshine Apartments, Sector 15, Noida",
      items: "2x 20L Mineral Water",
      total: "₹100",
      status: "Pending",
      orderTime: "Today, 10:30 AM"
    },
    { 
      id: 2, 
      customer: "Priya Singh", 
      customerPhone: "+91 9876543215",
      address: "B-12, Galaxy Apartments, Sector 15, Noida", 
      items: "1x 20L Mineral Water",
      total: "₹50",
      status: "Completed",
      orderTime: "Today, 9:15 AM"
    }
  ]);

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Vendor Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{vendor.businessName}</h1>
              <p className="text-gray-600">Owner: {vendor.ownerName}</p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💧</span>
                    <span>{vendor.waterType} - {vendor.pricePer20L}/20L</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span>🏪</span>
                    <span>{vendor.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>{vendor.businessHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📄</span>
                    <span>GST: {vendor.gstNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit Business
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">47</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-orange-600">3</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-green-600">44</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">Earnings</h3>
            <p className="text-3xl font-bold text-green-600">₹2,350</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{order.customer}</h4>
                    <p className="text-gray-600">📱 {order.customerPhone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : order.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-600 mb-3">
                  <p>🏠 {order.address}</p>
                  <p>📦 {order.items}</p>
                  <p className="text-sm">🕒 {order.orderTime}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">{order.total}</span>
                  
                  {order.status === 'Pending' && (
                    <div className="space-x-2">
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Accepted')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {order.status === 'Accepted' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'Completed')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;