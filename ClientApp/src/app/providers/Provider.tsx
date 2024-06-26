import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Pages importation
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import Main from "@pages/Main/Main";
import Error404 from "@pages/Error404/Error404";
import Dashboard from "@pages/Dashboard/Dashboard";

export default function Provider() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean: boolean) => {
        setIsAuthenticated(boolean);
    };

    const isAuth = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/auth/is-verify",
                {
                    method: "GET",
                    headers: { token: localStorage.token },
                }
            );
            const parseRes = await response.json();

            parseRes === true
                ? setIsAuthenticated(true)
                : setIsAuthenticated(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isAuth();
    });

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <Login setAuth={setAuth} />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !isAuthenticated ? (
                            <Register setAuth={setAuth} />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        !isAuthenticated ? (
                            <Navigate to="/login" />
                        ) : (
                            <Dashboard setAuth={setAuth} />
                        )
                    }
                />
                <Route path="/" element={<Main />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}
