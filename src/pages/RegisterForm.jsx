import { RegisterService } from '@/services/RegisterService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await RegisterService(data, imageFile);
        setIsSubmitting(false);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // ✅ Save to state
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div className="hidden md:flex w-1/2">
                <img src='https://th.bing.com/th/id/OIP.Xy_hBB7p8uXd_saCxgamVAHaFN?w=257&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3' />
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
                <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Name"
                            className="w-full px-4 py-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                        <Input
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email"
                            type="email"
                            className="w-full px-4 py-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        <Input
                            {...register('password', { required: 'Password is required', minLength: 6 })}
                            placeholder="Password"
                            type="password"
                            className="w-full px-4 py-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <div className="flex items-center gap-4">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded border"
                                />
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="flex-1 px-4 py-2 border rounded"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>

                    </form>
                    <p className="text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
