import api from "./axiosInstance";

export const ForgotpasswordService = async (email) => {
    try {
        const res = await api.post(
            '/auth/forgot-password',
            { email },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        alert(res.data.message || 'Password reset link sent to your email');
    } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong');
    }
};
