import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import useFetch from '../components/useFetch/useFetch';
import { MdOutlineLocalPolice } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaFireExtinguisher } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa6";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  const { data, loading, error } = useFetch('http://localhost:3007/messages');

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen w-screen">
      <span className="loading loading-spinner text-[#FD749B]"></span>
    </div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!data) {
    return <div>Нету данных</div>;
  }

  const messageTypeCounts = data.reduce((acc, message) => {
    acc[message.messageType] = (acc[message.messageType] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = data.reduce((acc, message) => {
    acc[message.status] = (acc[message.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(messageTypeCounts),
    datasets: [
      {
        label: '# of Messages',
        data: Object.values(messageTypeCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const getCardColor = (messageType) => {
    switch (messageType) {
      case 'police':
        return 'text-blue-500';
      case 'garbage':
        return 'text-gray-400';
      case 'fire':
        return 'text-yellow-500';
      case 'medical':
        return 'text-red-500';
      default:
        return 'text-white';
    }
  };
  const getIcon = (messageType) => {
    switch (messageType) {
      case 'police':
        return <MdOutlineLocalPolice size={40} className="text-blue-400" />;
      case 'garbage':
        return <FaRegTrashCan size={40} className="text-blue-400" />;
      case 'fire':
        return <FaFireExtinguisher size={40} className="text-blue-400" />;
      case 'medical':
        return <FaBriefcaseMedical size={40} className="text-blue-400" />;
      default:
        return;
    }
  };

  return (
    <div className="p-6 text-white min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Object.keys(messageTypeCounts).map((type) => (
          <div key={type} className="bg-gray-900 p-6 rounded-lg shadow-md shadow-slate-300 flex items-center justify-between">
            <div>
              <p className="text-pink-400 font-bold mb-1">В этом месяце:</p>
              <h2 className="text-xl font-bold">Вызвано <span className={`${getCardColor(type)}`}>{type}</span> :</h2>
              <p className="text-lg"><span className='text-gray-400'>Общее</span>: {messageTypeCounts[type]}</p>
            </div>
            {getIcon(type)}
          </div>
        ))}
      </div>
      <div className="bg-gray-900 p-6 rounded-lg shadow-md shadow-slate-300">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
