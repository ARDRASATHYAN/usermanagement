import Navbar from "@/components/Navbar";
import { deleteUserService } from "@/services/DelectuserServie";
import { UserviewService } from "@/services/UserviewService";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import { Pagination } from "../components/Pagination";

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const role = localStorage.getItem('role')
    const fetchUsers = async () => {
        setIsLoading(true);
        await UserviewService(
            page,
            searchTerm,
            setUsers,
            setTotalCount,
            setTotalPages,
            setIsLoading
        );
    };

    useEffect(() => {
        fetchUsers();
    }, [page, searchTerm]); // ✅ trigger fetch on searchTerm change

    const columns = [
        {
            header: "Profile",
            cell: ({ row }) =>
                row.original.profileImage ? (
                    <img
                        src={`http://localhost:5000/uploads/${row.original.profileImage}`}
                        alt={row.original.name}
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xs">
                        N/A
                    </div>
                ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => <span>{info.getValue()}</span>,
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "isVerified",
            header: "Verified",
            cell: (info) => (
                <span>{info.getValue() ? "✅ Yes" : "❌ No"}</span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Joined",
            cell: (info) =>
                new Date(info.getValue()).toLocaleString("en-IN"),
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: (info) => {
                const user = info.row.original;

                // Only admins can see edit/delete buttons
                if (role !== 'admin') {
                    return null;
                }

                return (
                    <div className="flex space-x-2">
                        <GoPencil
                            onClick={() => handleEditUser(user)}
                            className="text-lg hover:text-primary cursor-pointer"
                        />
                        <RiDeleteBin6Line
                            onClick={() => handleDeleteUser(user)}
                            className="text-lg hover:text-red-500 cursor-pointer"
                        />
                    </div>
                );
            },
        }

    ];
    const handleDeleteUser = async (user) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("accessToken");
            await deleteUserService(user.id, token);
            alert("User deleted successfully.");
            fetchUsers(); // refresh list
        } catch (error) {
            alert(error.message || "Error deleting user.");
        }
    };
    const navigate = useNavigate();

    const handleEditUser = (user) => {
        navigate(`/edit/${user.id}`);
    };
    return (
        <>
            <Navbar />
            <div className="p-6">

                <div className="bg-white shadow-lg rounded-2xl p-6 h-[calc(96vh-80px)] overflow-hidden flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">User List</h2>
                    {/* ✅ Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => {
                                setPage(1); // Reset to first page on new search
                                setSearchTerm(e.target.value);
                            }}
                            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-80"
                        />
                    </div>

                    <DataTable columns={columns} data={users} isLoading={isLoading} />

                    <div className="min-h-[52px] flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-4 py-3 border border-softgray rounded-b-md">
                        <div className="w-full sm:w-auto text-sm text-black text-left">
                            Total: <span className="font-semibold">{totalCount}</span>
                        </div>

                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={page}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Userlist;
