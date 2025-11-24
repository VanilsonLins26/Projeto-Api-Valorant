import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
import Navbar from "./pages/navbar";
import Content from "./pages/content";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/cadastro" element={<Cadastro/>}> </Route>
            <Route path="/login" element={<Login/>}> </Route>
            <Route path="/navbar" element={<Navbar/>}> </Route>
            <Route path="/content" element={<Content/>}> </Route>
        </Routes>
    )
}

export default AppRoutes