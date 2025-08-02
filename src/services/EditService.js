import api from "./axiosInstance";

export const EditService = async (userId, formData, accessToken) => {
    const response = await api.put(`/user/${userId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    return response.data;
};
