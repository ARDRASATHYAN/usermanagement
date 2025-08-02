import api from "./axiosInstance";

export const deleteUserService = async (userId, token) => {
    try {
        const res = await api.delete(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        console.error("Delete error:", err.response?.data?.message || err.message);
        throw err;
    }
};
