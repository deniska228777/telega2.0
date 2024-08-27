import React from "react";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import WrongAdress from "./pages/WrongPage.jsx";
import AuthProvider from "./auth/AuthProvider.js";
import CorePage from "./pages/CorePage.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Chats from "./pages/Chats.jsx";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<CorePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/wrongpath" element={<WrongAdress />} />
            <Route path="*" element={<Navigate to="/wrongpath" />} />
              <Route path="/" element={<Chats />} />
              <Route path=":id" element={<Chats />}/>
              <Route path="/profile" element={<h1>lol</h1>} />
            </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
