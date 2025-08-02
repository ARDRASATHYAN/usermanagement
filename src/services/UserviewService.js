// services/UserviewService.js

import api from "./axiosInstance";

export const UserviewService = async (
    page,
    searchTerm,
    setUsers,
    setTotalCount,
    setTotalPages,
    setIsLoading
) => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem("accessToken");

        const res = await api.get(`/user/view`, {
            params: {
                page,
                limit: 5, // Set a fixed limit or make it configurable
                searchTerm,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = res.data;

        if (Array.isArray(data.users)) {
            setUsers(data.users);
            setTotalCount(data.totalCount || data.users.length);
            setTotalPages(
                Math.ceil((data.totalCount || data.users.length) / 5)
            );
        } else if (Array.isArray(data)) {
            // fallback in case API returns just an array
            setUsers(data);
            setTotalCount(data.length);
            setTotalPages(1);
        } else {
            setUsers([]);
            setTotalCount(0);
            setTotalPages(1);
        }
    } catch (err) {
        console.error("❌ Error fetching users:", err.message);
        setUsers([]);
        setTotalCount(0);
        setTotalPages(1);
    } finally {
        setIsLoading(false);
    }
};
