import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. useNavigate import kiya
import { UserBaseURL } from './axiosInstance';

export default function Signup() {
    const navigate = useNavigate(); // 2. Navigate hook initialize kiya
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. FIX: Function ko async banaya backend call handle karne ke liye
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // 4. FIX: Backend validation ke keys (Capitalize) match kiye
            const backendData = {
                FirstName: formData.name,
                Email: formData.email,
                Password: formData.password
            };

            console.log('Sending to backend:', backendData);

            // 5. API call successfully executed
            const response = await UserBaseURL.post('/create', backendData);
            
            if (response.data.success) {
                alert("Account created successfully!");
                navigate('/login'); // Signup hote hi Login page par redirect
            }
        } catch (error) {
            console.error("Signup Error:", error);
            // Agar backend se koi error response aaya ho (jaise email already exists)
            alert(error.response?.data?.message || "Something went wrong during signup!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or already have an account? 
                    <Link
                        to='/login'
                        className="pl-0.5 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition"
                    >
                         Sign in
                    </Link>
                </p>
            </div>

            <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 w-full sm:max-w-md border border-gray-100">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                placeholder="••••••••"
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                placeholder="••••••••"
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
