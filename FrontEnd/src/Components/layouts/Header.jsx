import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css';
import ButtonToCart from '../../pages/cart/ButtonToCart';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [user, setUser] = useState(null);
    const customerEmail = Cookies.get('customerEmail');
    const email = customerEmail || (user && user.email);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('accessToken');
        Cookies.remove('customerEmail');
        navigate('/');
        window.location.reload();
    };

    return (
        <header className="header">
            <ButtonToCart />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <Link to="/">
                                <h2 className='text-title'>FitnessGear</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li>
                                    <NavLink className="header" activeClassName="active" to="/">Trang chủ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="header" activeClassName="active" to="/shop">Shop</NavLink>
                                </li>
                                <li>
                                    <Link to="#">Trang</Link>
                                    <ul className="header__menu__dropdown custom_dropdown">
                                        <li>
                                            <NavLink className="header" activeClassName="active" to="/cart">Giỏ hàng</NavLink>
                                        </li>
                                        {email ? (
                                            <li>
                                                <Link to={`/bill/${email}`}>Xem hóa đơn</Link>
                                            </li>
                                        ) : (
                                            <li>
                                                <Link to={`/bill`}>Xem hóa đơn!</Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <NavLink className="header" activeClassName="active" to="/blog">Blogs</NavLink>
                                </li>
                                <li>
                                    <NavLink className="header" activeClassName="active" to="/contact">Liên hệ</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <nav className="header__menu hm_custom">
                            <ul>
                                {user ? (
                                    <li>
                                        <Link to="#">
                                            <img src={`http://localhost:3000/images/${user.img}` || 'default-profile.png'} alt="avt" className="profile-picture" />
                                            {user.name}
                                        </Link>
                                        <ul className="header__menu__dropdown custom_dropdown ct_dd">
                                            {user.isAdmin === 1 && (
                                                <li>
                                                    <Link to="/admin">Quản trị</Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link to={`/myProfile/${user.id}`}>
                                                    <i className='fa fa-user' />
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogout}>
                                                    <i className='fa fa-sign-out' />
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li>
                                        <Link to="/login">
                                            <i className="fa fa-user" />
                                        </Link>
                                        <ul className="header__menu__dropdown custom_dropdown ct_dd">
                                            <li>
                                                <Link to="/login">ĐĂNG NHẬP</Link>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                <li>
                                    <Link to="/cart">
                                        <i className="fa fa-shopping-bag" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars" />
                </div>
            </div>
        </header>
    );
}

export default Header;
