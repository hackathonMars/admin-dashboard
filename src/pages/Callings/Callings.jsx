import React, { useEffect, useState } from 'react';
import useFetch from '../../components/useFetch/useFetch';
import BreadCrumb from '../../components/Breadcrumb/BreadCrumb';
import axios from 'axios';
import Card from '../../components/Card/Card';

const Callings = () => {
  const { data, loading, error } = useFetch('http://localhost:3007/messages');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-screen">
        <span className="loading loading-spinner text-[#FD749B]"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3007/messages/${id}`, { status: newStatus });

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, status: newStatus } : message
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getCardColor = (messageType) => {
    switch (messageType) {
      case 'police':
        return 'bg-blue-800';
      case 'garbage':
        return 'bg-gray-500';
      case 'fire':
        return 'bg-yellow-700';
      case 'medical':
        return 'bg-red-700';
      default:
        return 'bg-white';
    }
  };

  const truncateDescription = (text, maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Messages</h1>
          <BreadCrumb path={"Callings"} />
        </div>
      </div>
      {messages && messages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              message={message}
              handleStatusChange={handleStatusChange}
              getCardColor={getCardColor}
              truncateDescription={truncateDescription}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">No messages found.</div>
      )}
    </div>
  );
};

export default Callings;
