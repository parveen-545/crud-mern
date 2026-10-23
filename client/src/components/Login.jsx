import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                    <button onClick={()=> navigate('/signup')}
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition"
                    >
                        Register a New Account
                    </button>
                </p>
            </div>

            <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 w-full sm:max-w-md border border-gray-100">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                                placeholder="your email"
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

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
