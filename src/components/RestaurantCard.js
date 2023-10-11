import { IMG_CDN_URL } from '../constants';

const RestaurantCard = (props) => {
    // const { resDat
    console.log(props)
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
        props;
    return (
        <div
            data-testid="resCard"
            className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:shadow-md hover:bg-gray-200 transition-all "
        >
            <div>
                <img
                    className="w-[250px] h-[150px] object-cover rounded-lg"
                    src={IMG_CDN_URL + cloudinaryImageId}
                    alt="Biryani"
                />
            </div>

            <div className="flex flex-col items-center gap-2 md:items-start">
                <h3 className="py-2 text-lg font-bold">{name}</h3>
                <hr />
                <em>{cuisines.join(', ')}</em>
                <h4 className="flex items-center gap-2">
                    <span className="icons">
                        {/* <AiOutlineStar /> */}
                    </span>
                    <span>{avgRating} stars</span>
                </h4>
                <h4 className="flex items-center gap-2">
                    {/* <span style={{ marginLeft: '4px' }}>₹</span> */}
                    <span>{costForTwo}</span>
                </h4>
                <h4 className="flex items-center gap-2">
                    <span>
                        {/* <FiClock /> */}
                    </span>
                    <span>{sla.deliveryTime} minutes</span>
                </h4>
            </div>
        </div>
    );
};



export default RestaurantCard;