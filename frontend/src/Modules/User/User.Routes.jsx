import { Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import UserHomePage from "./Pages/UserHomePage";

export const userRoutes = (
  <>
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />
    <Route path="/" element={<UserHomePage />} />
  </>
);
