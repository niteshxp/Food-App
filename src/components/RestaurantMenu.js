import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useRestaurant from '../utils/useRestaurant';
import RestaurantCategory from './RestaurantCategory';
import Shimmer from './Shimmer';
import { IMG_CDN_URL } from '../constants';

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurant(resId);
    const [showIndex, setShowIndex] = useState(null);
    if (resInfo === null) return <Shimmer />;

    const {
        name,
        cuisines,
        costForTwoMessage,
        cloudinaryImageId,
        avgRating,
        deliveryTime,
    } = resInfo?.cards[0]?.card?.card?.info;
    console.log(resInfo?.cards[0]?.card?.card?.info);
    const categories =
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
                c.card?.card?.['@type'] ===
                'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
        );

    return (
        <div className="text-center">
            <header className="min-h-[30vh] p-4 bg-black text-[#f7f7f7] flex justify-center items-center gap-[30px]">
                <div className="menu-header-left">
                    <img
                        src={IMG_CDN_URL + cloudinaryImageId}
                        alt="Restaurent Info"
                        className="hidden md:block w-[250px] object-cover h-[170px] rounded-md bg-cover bg-center"
                    />
                </div>
                <div className="menu-header-right">
                    <div className="top">
                        <h1 className="text-[40px] font-normal">{name}</h1>
                        <h3 className="font-normal opacity-[0.7] mt-[5px]">
                            {cuisines.join(', ')}
                        </h3>
                    </div>
                    <div className="flex gap-[20px] items-center mt-[20px]">
                        <h4 className="flex items-center border-r-[4px] border-[#ccc] gap-1 pr-[20px]">
                            <span
                                className="icons"
                                style={{
                                    position: 'relative',
                                    top: '2px',
                                    marginRight: '3px',
                                }}
                            >

                            </span>
                            <span>{"⭐"}{avgRating}</span>
                        </h4>
                        <h4 className="flex items-center gap-1 border-r-[4px] border-[#ccc] pr-[20px]">
                            <h3>{costForTwoMessage}</h3>
                        </h4>

                    </div>
                </div>
            </header>

            <div className="my-[50px] ml-[6%] text-left">
                <Link
                    to="/"
                    className="px-4 py-2 font-bold duration-[0.3s] bg-neutral-700 text-white rounded-md hover:bg-neutral-800"
                >
                    &larr; Back
                </Link>
            </div>

            {/* categories accordions */}
            {categories?.map((category, index) => (
                <RestaurantCategory
                    key={category?.card?.card.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                />
            ))}
        </div>
    );
};


export default RestaurantMenu;