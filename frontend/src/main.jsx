import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx';
import { router } from "./router.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
)
