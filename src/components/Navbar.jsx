import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const navLinkClasses = ({ isActive }) =>
        isActive
            ? 'text-blue-600 font-semibold'
            : 'text-gray-700 hover:text-blue-600 transition';

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        const storedImage = localStorage.getItem('profileImage');
        if (storedName) setUserName(storedName);
        if (storedImage) setProfileImage(storedImage);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserName('');
        setProfileImage('');
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white">
                    MyApp
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 items-center">
                    <NavLink to="/dashboard" className={navLinkClasses}>Home</NavLink>


                    {/* Profile dropdown */}
                    {userName && (
                        <div className="relative ml-4" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                {profileImage && (
                                    <img
                                        src={`http://localhost:5000/uploads/${profileImage}`}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                    />
                                )}
                                <span className="text-white font-semibold">{userName}</span>
                                <ChevronDown size={16} className="text-white" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-10">
                                    <Link
                                        to="/edit"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden focus:outline-none text-white">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-3 px-4 text-white">
                    <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>Home</NavLink>

                    <NavLink to="/dashboard" className={navLinkClasses} onClick={toggleMenu}>Dashboard</NavLink>

                    {userName && (
                        <div className="mt-3 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                {profileImage && (
                                    <img
                                        src={`http://localhost:5000/uploads/${profileImage}`}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                    />
                                )}
                                <span className="text-white font-semibold">
                                    Hello, {userName}
                                </span>
                            </div>
                            <Link
                                to="/edit"
                                onClick={toggleMenu}
                                className="text-sm text-blue-100 hover:text-white"
                            >
                                Edit Profile
                            </Link>
                            <button
                                onClick={() => {
                                    toggleMenu();
                                    handleLogout();
                                }}
                                className="text-sm text-blue-100 hover:text-white text-left"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
