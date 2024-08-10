import { Link } from 'react-router-dom';
import './cart.css';


const ButtonToCart = () => {
    return (
        <>
            <Link to='/cart'>
                <button className="btnToCart">
                    <i className="fa fa-shopping-bag" />
                </button>
            </Link>
        </>

    );
}
export default ButtonToCart;