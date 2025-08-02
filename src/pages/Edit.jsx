import { EditService } from '@/services/EditService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [usereId, setUserId] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        const storedImage = localStorage.getItem('profileImage');
        const userId = localStorage.getItem('id');
        if (storedName) setUserName(storedName);
        if (storedImage) setProfileImage(storedImage);
        if (userId) setUserId(userId);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userName', userName);
        if (profileImage instanceof File) {
            formData.append('profileImage', profileImage);
        }

        try {
            const userId = localStorage.getItem('id');
            const accessToken = localStorage.getItem('accessToken');

            const result = await EditService(userId, formData, accessToken);

            localStorage.setItem('userName', result.userName);
            localStorage.setItem('profileImage', result.profileImage);

            alert('Profile updated successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                    {previewImage ? (
                        <img src={previewImage} alt="Preview" className="mt-3 w-24 h-24 rounded-full object-cover" />
                    ) : profileImage && typeof profileImage === 'string' ? (
                        <img src={`http://localhost:5000/uploads/${profileImage}`} alt="Current" className="mt-3 w-24 h-24 rounded-full object-cover" />
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
