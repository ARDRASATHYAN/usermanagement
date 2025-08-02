import api from "./axiosInstance";

export const LoginService = async (data) => {
    try {
        const res = await api
            .post('/auth/login', data, {
                headers: { 'Content-Type': 'application/json' },
            });

        const result = res.data;


        return { success: true, data: result };
    } catch (err) {

        return {
            success: false,
            message: err.response?.data?.message || 'Login failed',
        };
    }
};
