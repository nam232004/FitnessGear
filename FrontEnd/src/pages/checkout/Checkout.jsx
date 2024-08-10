import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addBill } from "../../services/CheckoutService";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './checkout.css';
import { clear } from "../../feater/cartSlice";

const Checkout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const cartItems = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState({});

    // Lấy thông tin người dùng từ cookie
    const user = JSON.parse(Cookies.get('user') || '{}');

    const today = new Date();
    const vietnamOffset = 7 * 60;
    const localDate = new Date(today.getTime() + vietnamOffset * 60 * 1000);
    const formattedDate = localDate.toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        customer_name: user.name || '',
        customer_address: '',
        customer_phone: '',
        customer_email: user.email || '',
        method: 'COD',
        status: 'Chờ xác nhận',
        order_date: formattedDate
    });
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipPrice = totalPrice * 0.1;
    const totalAmount = totalPrice + shipPrice;

    useEffect(() => {
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                customer_name: user.name || prevData.customer_name,
                customer_email: user.email || prevData.customer_email
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isCheckboxChecked) {
            setError({ check: 'Vui lòng xác nhận thông tin.' });
            return;
        }

        const orderId = `DH${String(Math.floor(Math.random() * 900000) + 100000)}`;
        const goods = cartItems.map(item => ({
            name: item.name,
            price: item.price,
            img: item.img,
            quantity: item.quantity
        }));

        if (!formData.customer_name || !formData.customer_address || !formData.customer_email || !formData.customer_phone) {
            setError({ error: 'Vui lòng điền đủ thông tin người nhận.' });
            return;
        }

        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(formData.customer_phone)) {
            setError({ phone: 'Số điện thoại không đúng định dạng.' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.customer_email)) {
            setError({ email: 'Email không đúng định dạng.' });
            return;
        }

        try {
            const response = await addBill(
                orderId,
                formData.customer_name,
                formData.customer_address,
                formData.customer_phone,
                formData.customer_email,
                totalAmount,
                formData.method,
                formData.status,
                formData.order_date,
                goods
            );

            Cookies.set('customerEmail', formData.customer_email, { expires: 1 }); 

            enqueueSnackbar('Đặt hàng thành công!', { variant: 'success' });
            dispatch(clear());
            navigate('/');
        } catch (error) {
            enqueueSnackbar('Lỗi khi đặt hàng. Vui lòng thử lại.', { variant: 'error' });
            console.error('Error placing order:', error);
        }
    };

    return (
        <>
            {/* Breadcrumb Section Begin */}
            <section
                className="breadcrumb-section set-bg"
                style={{ backgroundImage: `url(http://localhost:3000/images/hero.png)` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb Section End */}

            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <h4>THÔNG TIN ĐẶT HÀNG</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="checkout__input">
                                        <p>Tên khách hàng<span>*</span></p>
                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={formData.customer_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="checkout__input">
                                        <p>Địa chỉ<span>*</span></p>
                                        <input
                                            type="text"
                                            name="customer_address"
                                            value={formData.customer_address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="checkout__input">
                                        <p>Số điện thoại<span>*</span></p>
                                        <input
                                            type="tel"
                                            name="customer_phone"
                                            value={formData.customer_phone}
                                            onChange={handleInputChange}
                                        />
                                        <small className="text-danger">
                                            {error.phone && error.phone}
                                        </small>
                                    </div>
                                    <div className="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input
                                            type="text"
                                            name="customer_email"
                                            value={formData.customer_email}
                                            onChange={handleInputChange}
                                        />
                                        <small className="text-danger">
                                            {error.email && error.email}
                                        </small>
                                        <small className="text-danger">
                                            {error.error && error.error}
                                        </small>
                                    </div>

                                    <div className="checkout__input">
                                        <p>Ngày mua</p>
                                        <input
                                            type="date"
                                            name="order_date"
                                            value={formData.order_date}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="checkout__input__checkbox">
                                        <label htmlFor="acc">
                                            Xác nhận thông tin chính xác
                                            <input
                                                type="checkbox"
                                                id="acc"
                                                checked={isCheckboxChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkmark" />
                                            <br />
                                            <small className="text-danger">
                                                {error.check && error.check}
                                            </small>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="checkout__order">
                                        <h4>Hóa đơn của bạn</h4>
                                        <div className="checkout__order__products">
                                            Sản phẩm <span>Số tiền</span>
                                        </div>
                                        <ul>
                                            {cartItems.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} <span>{(item.quantity * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="checkout__order__subtotal">
                                            Tổng cộng <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            <br />
                                            Phí vận chuyển (10%)<span>{shipPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                        <div className="checkout__order__total">
                                            Phải thanh toán <span>{(totalPrice + shipPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="payment">
                                                Thanh toán khi nhận hàng
                                                <input
                                                    type="radio"
                                                    id="payment"
                                                    name="method"
                                                    value="COD"
                                                    checked={formData.method === 'COD'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="paypal">
                                                Chuyển khoản
                                                <input
                                                    type="radio"
                                                    id="paypal"
                                                    name="method"
                                                    value="PAYPAL"
                                                    checked={formData.method === 'PAYPAL'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <button type="submit" className="site-btn">
                                            Mua hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* Checkout Section End */}
        </>
    );
};

export default Checkout;
