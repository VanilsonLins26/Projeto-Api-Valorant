import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { data, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function ProtectRoutes({children}){
    const [item, setItem] = useState(false);

        async function validation() {
        try {
            const token = localStorage.getItem("token")
            fetch(`http://localhost:8080/auth/validacao/${token}`, {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`}
            })
            setItem(Response.data)

        }catch(error){
            console.log(error, item)
        }
            
        }

    useEffect(() => {
        validation()
    }, []);

    return {

    }
}