import { ResetService } from '@/services/ResetService';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ password }) => {
        const result = await ResetService(token, password);

        if (result.success) {
            alert(result.message);
            navigate('/');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="/assets/change-password.jpg"
                    alt="Forgot Password"
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)} >


                        <input
                            type="password"
                            placeholder="New Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Min 6 characters' },
                            })}
                            className="w-full px-3 py-2 border rounded mb-2"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
