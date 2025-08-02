import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your email, please wait...");
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/auth/verify/${token}`)
            .then(async res => {
                const data = await res.json();
                if (res.ok) {
                    setMessage("✅ Email verified successfully! Redirecting to login...");
                    setTimeout(() => navigate("/"), 2000);
                } else {
                    setError(true);
                    setMessage(data.message || "❌ Verification failed. Link may be invalid or expired.");
                }
            })
            .catch(() => {
                setError(true);
                setMessage("❌ Network error. Please try again later.");
            });
    }, [token, navigate]);

    return (
        <div style={{
            maxWidth: "500px",
            margin: "100px auto",
            padding: "30px",
            textAlign: "center",
            fontFamily: "Arial",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9"
        }}>
            <h2>Email Verification</h2>
            <p style={{ color: error ? 'red' : 'green' }}>{message}</p>
        </div>
    );
};

export default VerifyEmail;
