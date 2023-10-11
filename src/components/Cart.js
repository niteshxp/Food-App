import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import { IMG_CDN_URL } from '../constants';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const totalItems = cartItems.length;

    // const [totalBill, setTotalBill] = useState(0);

    // useEffect(() => {
    //     let total = 0;
    //     cartItems.items.forEach((cur) => {
    //         total += (cur.price / 100);
    //     });
    //     total.toFixed(2);
    //     setTotalBill(total);
    // }, []);

    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className='flex'>
            <div className="p-4 m-4 text-center">
                <h1 className="text-2xl font-bold">Cart</h1>
                <div className="w-6/12 mx-auto min-w-[400px]">
                    {cartItems.length === 0 && (
                        <h2 className="mt-6 text-xl font-medium">
                            Your cart is empty, Add some items to the cart 🛒.
                        </h2>
                    )}
                    {cartItems.map((item) => (
                        <>
                            <div
                                key={item.card.info.id}
                                className="flex justify-between flex-shrink-0 p-0 text-left border-b-2 md:p-2 md:m-2"
                            >
                                <div className="w-9/12 max-w-full">
                                    <div className="py-2">
                                        <span>{item.card.info.name}</span>
                                        <span>
                                            - ₹
                                            {item.card.info.price
                                                ? item.card.info.price / 100
                                                : item.card.info.defaultPrice / 100}
                                        </span>
                                    </div>
                                    <p className="text-xs">{item.card.info.description}</p>
                                </div>
                                <div className="w-3/12 p-4">
                                    <div className="absolute"></div>
                                    <img
                                        src={IMG_CDN_URL + item.card.info.imageId}
                                        alt={item.card.info.name}
                                        className="w-full rounded-md"
                                    />
                                </div>
                            </div>
                        </>
                    ))}
                    {cartItems.length > 0 && (
                        <button
                            className="p-2 m-2 bg-red-500 hover:bg-red-400 duration-[.3s] text-white rounded-md font-medium"
                            onClick={handleClearCart}
                        >
                            Clear Cart 🧹
                        </button>
                    )}
                </div>
            </div>
            <div className='mt-5 ml-5 font-bold'>
                <h3>Total items : {totalItems}</h3>
                {/* <h3 >Total Amount to Pay:</h3>
                <h3 >{totalBill}Rs</h3> */}
            </div>
        </div>
    );
};

export default Cart;