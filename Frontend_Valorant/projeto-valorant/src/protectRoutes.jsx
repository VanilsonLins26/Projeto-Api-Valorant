import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoutes = () => {

    const token = localStorage.getItem("token");
    const isPremiumString = localStorage.getItem("isPremium");


    if (!token) {
        return <Navigate to="/login" />;
    }


    const isPremium = isPremiumString === "true";


    if (!isPremium) {
        return <Navigate to="/checkout" />;
    }


    return <Outlet />;
};