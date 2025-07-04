import { useState } from 'react'

function App() {
  const [userPoints] = useState(1250)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Thanx Rewards System
            </h1>
            <p className="text-gray-600">
              Your gateway to amazing rewards
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Your Points Balance
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {userPoints.toLocaleString()} points
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🎁 Browse Rewards
              </h3>
              <p className="text-green-700 mb-4">
                Discover amazing rewards you can redeem with your points
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                View Rewards
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                📋 Redemption History
              </h3>
              <p className="text-purple-700 mb-4">
                Track all your past redemptions and rewards
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                View History
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Frontend: React + Vite + TypeScript + Tailwind CSS
              <br />
              Backend: Ruby on Rails API + SQLite
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
