import api from "./axiosInstance";

export const LoginService = async (data) => {
    try {
        const res = await api
            .post('/auth/login', data, {
                headers: { 'Content-Type': 'application/json' },
            });

        const result = res.data; // ✅ axios automatically parses JSON

        // Optional: return everything to let the caller handle success
        return { success: true, data: result };
    } catch (err) {
        // Optional: return error details to the caller
        return {
            success: false,
            message: err.response?.data?.message || 'Login failed',
        };
    }
};
