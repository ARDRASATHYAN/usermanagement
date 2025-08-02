import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // match your backend
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            try {
                const res = await axios.post("http://localhost:5000/api/auth/refresh", {
                    token: refreshToken,
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                console.log("Original request failed, attempting token refresh...");
                console.log("New AccessToken:", newAccessToken);


                // Update token in header and retry request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // ✅ this is the fix
            } catch (err) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
