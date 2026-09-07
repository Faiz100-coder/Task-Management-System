import React from "react";

export default function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-4 border-top">
            <p className="mb-0">© {new Date().getFullYear()} Task Management System</p>
        </footer>
    );
}
