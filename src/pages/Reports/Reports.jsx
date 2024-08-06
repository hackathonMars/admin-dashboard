// Reports.jsx
import React from 'react';
import useFetch from '../../components/useFetch/useFetch';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const Reports = () => {
    const { data, loading, error, setData } = useFetch('http://localhost:3007/reports');

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3007/reports/${id}`);
            setData(prevData => prevData.filter(report => report.id !== id));
        } catch (err) {
            console.error("Failed to delete report:", err);
        }
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto flex justify-center items-center mx-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(report => (
                        <tr key={report.id}>
                            <th>{report.id}</th>
                            <td className='max-w-[150px]'>{new Date(report.date).toLocaleString()}</td>
                            <td>{report.type}</td>
                            <td className='max-w-[250px]'>{report.location}</td>
                            <td className='text-red-700 text-center'>{report.description}</td>
                            <td>{report.number}</td>
                            <td>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleDelete(report.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
