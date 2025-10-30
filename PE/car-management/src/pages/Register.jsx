import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hello, ${form.username}! Your registration is successful.`);
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center mb-4">Register Member</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
}
