import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { add } from '../../feater/cartSlice';
import useAlertBar from '../alert/Alert';

const ProductCard = ({ product, columnClass }) => {
    const dispatch = useDispatch();
    const { showAlertCart } = useAlertBar();

    const handleAddToCart = (event) => {
        event.preventDefault();
        dispatch(add(product));
        showAlertCart(product.name);
    };

    return (
        <div className={columnClass}>
            <div className="product__item">
                <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(http://localhost:3000/images/${product.img})` }}
                >
                    <ul className="product__item__pic__hover">
                        <li>
                            <Link to={`/detail/${product.id}`}>
                                <i className="fa fa-search" />
                            </Link>
                        </li>
                        <li>
                            <a>
                                <i className="fa fa-retweet" />
                            </a>
                        </li>
                        <li>
                            <a onClick={handleAddToCart}>
                                <i className="fa fa-shopping-cart" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6>
                        <Link to={`/detail/${product.id}`}>{product.name}</Link>
                    </h6>
                    <h5>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    columnClass: PropTypes.string.isRequired,
};

export default ProductCard;
