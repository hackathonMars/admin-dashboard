import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Submitting Login - Name:", name, "Password:", password);

        const success = await login(name, password);
        setLoading(false);
        if (success) {
            navigate('/callings');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center w-full items-center min-h-screen relative">
            <div className="border bg-[#16072366] p-16 rounded-lg shadow-xl w-full max-w-2xl z-10">
                <h1 className="text-4xl font-bold mb-10 text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Your Name:</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700" required />
                    </div>
                    <button type="submit" className="cursor-pointer mt-8 w-full bg-[#1b092b] outline outline-[#5c0ca7] text-white font-normal py-2 rounded-lg flex justify-center items-center">
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
            <div className="absolute bottom-0 w-full">
                <img src="/Group 764.png" alt="Background" className="w-full" />
            </div>
        </div>
    );
};

export default Login;
