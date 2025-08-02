import { ForgotpasswordService } from '@/services/ForgotpasswordService';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async ({ email }) => {
        await ForgotpasswordService(email)
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="/assets/forgotpassword.jpg"
                    alt="Forgot Password"
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>



                    <form onSubmit={handleSubmit(onSubmit)} className="">


                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-3 py-2 border rounded mb-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
