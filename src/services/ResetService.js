import api from "./axiosInstance";

export const ResetService = async (token, password) => {
    try {
        const res = await api.post(`/auth/reset-password/${token}`,
            { password },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        return {
            success: true,
            message: res.data.message || 'Password reset successful!',
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Reset failed',
        };
    }
};
