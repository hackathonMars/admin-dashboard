// components/Card/Card.js
import React from 'react';

const Card = ({ message, handleStatusChange, getCardColor, truncateDescription }) => (
  <div
    key={message.id}
    className={`p-4 rounded-lg shadow-lg ${getCardColor(message.messageType)}`}
  >
    <img
      src={message.photoUrl}
      alt={message.messageType}
      className="w-full h-48 object-cover rounded-md"
    />
    <div className="mt-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
        Need a {message.messageType} help!
      </h2>
      <p className="text-gray-300 text-sm sm:text-base mb-1">
        Location: {message.location}
      </p>
      <p className="text-amber-50 text-sm sm:text-base mb-4">
        {truncateDescription(message.description, 50)}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs sm:text-sm text-green-200">
          {new Date(message.timestamp).toLocaleString()}
        </span>
        <span
          className={`text-xs sm:text-sm font-semibold ${message.status === 'Pending'
            ? 'text-yellow-500'
            : 'text-green-500'
            }`}
        >
          {message.status}
        </span>
      </div>
      <div className="flex flex-wrap justify-between sm:justify-start gap-2 mt-2">
        <button
          onClick={() => handleStatusChange(message.id, 'Readed')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Readed'
            ? 'btn-success'
            : 'btn-outline btn-info'
            }`}
        >
          Readed
        </button>
        <button
          onClick={() => handleStatusChange(message.id, 'Pending')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Pending'
            ? 'btn-success'
            : 'btn-outline btn-warning'
            }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange(message.id, 'Helped')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Helped'
            ? 'btn-success'
            : 'btn-outline btn-success'
            }`}
        >
          Helped
        </button>
      </div>
    </div>
  </div>
);

export default Card;
