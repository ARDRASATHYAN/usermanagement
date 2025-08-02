// services/RegisterService.js

import api from "./axiosInstance";

export const RegisterService = async (data, imageFile) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('profile', imageFile);

    try {
        const res = await api.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert(res.data.message);
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Registration failed');
    }
};
