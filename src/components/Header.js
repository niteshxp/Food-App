import { useState ,useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
// import UserContext from "../utils/UserContext";
import logo from "../assets/img/logo.png";
import { useSelector } from "react-redux";

const Title = () => (
    <a href="/">
        <img
            className="h-20 p-2 m-1 ml-10"
            alt="logo"
            src={logo}
        />
    </a>
);

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isOnline = useOnline();
    // const {user} = useContext(UserContext);

    const cartItems = useSelector(store => store.cart.items)
    console.log(cartItems);

    return (
        <div className="flex bg-sky-50 shadow-lg">
            <Title />
            <div className="nav-items" >
                <ul className="flex ml-96 mt-8">
                    <Link to="/">
                        <li className="px-2 ml-80">Home</li>
                    </Link>
                    <Link to="/about">
                        <li className="px-2">About</li>
                    </Link>
                    <Link to="/contact">
                        <li className="px-2">Contact</li>
                    </Link>
                    <Link to="/cart">
                        <li className="px-2">🛒 (
                            {cartItems.length === 1
                                ? `${cartItems.length} item`
                                : `${cartItems.length} items`}
                            )</li>
                    </Link>
                    {/* <Link to="/instamart">
                        <li className="px-2">Instamart</li>
                    </Link> */}
                    <Link to="/login" >
                        <li className="px-2">Login</li>                
                    </Link>

                </ul>
                
            </div>
            <h1 className="mt-8 ml-1">{isOnline ? "online ✅" : "Offline 🔴"}</h1>
        </div>
    );
};

export default Header;