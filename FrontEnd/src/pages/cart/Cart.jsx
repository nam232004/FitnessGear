import "./cart.css";
import { useDispatch, useSelector } from 'react-redux';
import { remove, updateQuantity } from '../../feater/cartSlice';
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const navigate = useNavigate();
    const isCartEmpty = cartItems.length === 0;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = (index, delta) => {
        const newQuantity = cartItems[index].quantity + delta;
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: cartItems[index].id, quantity: newQuantity }));
        } else {
            alert("Số lượng sản phẩm không thể nhỏ hơn 1.");
        }
    };

    const handleRemove = (index, item) => {
        if (window.confirm(`Bạn có chắc muốn xóa ${item.name} khỏi giỏ hàng không?`)) {
            dispatch(remove({ id: item.id }));
            alert('Đã xóa sản phẩm khỏi giỏ hàng');
        }
    };
    const next = () => {
        navigate('/checkout');
    }
    return (
        <>
            <section
                className="breadcrumb-section set-bg"
                style={{ backgroundImage: `url(http://localhost:3000/images/hero.png)` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2 className="text-shadow">Shopping Cart</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 table-responsive">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng cộng</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="loadCart">
                                    {cartItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="6"><h3>Giỏ hàng trống!</h3></td>
                                        </tr>
                                    ) : (cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={`http://localhost:3000/images/${item.img}`}
                                                    alt={item.name}
                                                    className="img-fluid me-5 rounded-circle"
                                                    style={{ width: 80, height: 80 }}
                                                />
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{item.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                            <td className="d-flex justify-content-center align-items-center">
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button
                                                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                            onClick={() => handleQuantityChange(index, -1)}
                                                        >
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm text-center border-0 bg-white"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <div className="input-group-btn">
                                                        <button
                                                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                            onClick={() => handleQuantityChange(index, 1)}
                                                        >
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-md rounded-circle bg-light border mt-4"
                                                    onClick={() => handleRemove(index, item)}
                                                >
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>THANH TOÁN</h5>
                                <ul>
                                    <li>
                                        Phải thanh toán <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </li>
                                    <li>
                                        Tổng cộng <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </li>
                                </ul>
                                <button className="primary-btn custom_btn" disabled={isCartEmpty} onClick={() => next()}>
                                    XÁC NHẬN THANH TOÁN
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
