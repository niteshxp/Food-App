import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Instamart from "./components/Instamart";
import Shimmer from "./components/Shimmer";
import Cart from "./components/Cart";
import LogIn from "./components/Login";
import { Provider } from "react-redux";
import store from "./utils/store";

// const Instamart = lazy(() => import("./components/Instamart"))

const AppLayout = () => {
    return (
        <Provider store={store}>
            <Header />
            <Outlet />
            <Footer />
        </Provider>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading...</h1>}>
                    <About />
                </Suspense>,
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
            ,
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/instamart",
                element: <Suspense fallback={<Shimmer />} >
                    <Instamart />
                </Suspense>,
            },
            {
                path: "/login",
                element: <LogIn />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);