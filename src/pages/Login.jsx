import { LoginService } from '@/services/LoginService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');

        const result = await LoginService(data);

        if (result.success) {
            const { accessToken, refreshToken, user } = result.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('profileImage', user.profileImage);
            localStorage.setItem('id', user.id);
            localStorage.setItem('role', user.role);

            navigate('/dashboard');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/003/689/251/large_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                    alt="Login Illustration"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                            <div className="text-right mt-1">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
