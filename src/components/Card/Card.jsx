import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";

const Card = ({ message, handleStatusChange, getCardColor, truncateDescription }) => (
  <div
    key={message.id}
    className={`p-4 rounded-lg shadow-lg bg-blue-950 shadow-slate-400 relative`}
  >
    <img
      src={message.photoUrl}
      alt={message.messageType}
      className="w-full h-48 object-cover rounded-md"
    />
    <span
      className={`absolute top-2 right-2 px-5 py-1 rounded-md text-xs font-bold ${getBadgeColor(
        message.messageType
      )}`}
    >
      {message.messageType}
    </span>
    <div className="mt-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
        Нуждается в {message.messageType}!
      </h2>
      <p className="text-gray-300 text-xs sm:text-sm mb-1 flex items-center gap-1"><CiLocationOn />
        Аддрес: {message.location}</p>
      <p className="text-amber-50 text-xs sm:text-sm mb-4 flex items-center gap-1">
        {truncateDescription(message.description, 50)}
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm text-green-200 flex items-center gap-1">
          <CiCalendar />
          {new Date(message.timestamp).toLocaleString()}
        </span>
        <span className={`text-xs sm:text-sm font-semibold ${colorMessage(message.status)}`}>
          {message.status}
        </span>
      </div>
      <div className="flex flex-wrap justify-between sm:justify-around gap-2 mt-1">
        <button
          onClick={() => handleStatusChange(message.id, 'Прочитано')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Readed' ? 'btn-success' : 'btn-outline btn-info'
            }`}
        >
          Прочитано
        </button>
        <button
          onClick={() => handleStatusChange(message.id, 'Обрабатывается')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Обрабатывается' ? 'btn-warning' : 'btn-outline btn-warning'
            }`}
        >
          В Процессе
        </button>
        <button
          onClick={() => handleStatusChange(message.id, 'Выполнено')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Helped' ? 'btn-success' : 'btn-outline btn-success'
            }`}
        >
          Выполнено
        </button>
        <button
          onClick={() => handleStatusChange(message.id, 'Отказано')}
          className={`btn flex-1 sm:flex-none btn-xs sm:btn-sm ${message.status === 'Refused' ? 'btn-error' : 'btn-outline btn-error'
            }`}
        >
          Отклонено
        </button>
      </div>
    </div>
  </div>
);

const getBadgeColor = (messageType) => {
  switch (messageType) {
    case 'police':
      return 'bg-blue-800 text-white';
    case 'garbage':
      return 'bg-gray-500 text-white';
    case 'fire':
      return 'bg-yellow-600 text-white';
    case 'medical':
      return 'bg-red-700 text-white';
    default:
      return 'bg-gray-300 text-black';
  }
};

const colorMessage = (messageStatus) => {
  switch (messageStatus) {
    case 'Обрабатывается':
      return 'text-yellow-500';
    case 'Прочитано':
      return 'text-gray-300';
    case 'Выполнено':
      return 'text-green-500';
    case 'Отказано':
      return 'text-red-600';
    default:
      return 'text-white';
  }
};


export default Card;
