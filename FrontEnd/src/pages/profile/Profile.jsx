import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [avatar, setAvatar] = useState("http://ssl.gstatic.com/accounts/ui/avatar_2x.png");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        mobile: '',
        email: '',
        location: '',
        password: '',
        password2: ''
    });
    const [activeTab, setActiveTab] = useState('home');

    const readURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

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
                                <h2 className="text-shadow">Trang cá nhân</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="spad">
                <div className="container bootstrap snippet">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center">
                                <img
                                    src={avatar}
                                    className="avatar img-circle img-thumbnail"
                                    alt="avatar"
                                />
                                <input
                                    type="file"
                                    className="text-center center-block file-upload"
                                    onChange={readURL}
                                />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <ul className="nav nav-tabs">
                                <li>
                                    <NavLink
                                        className="tab"
                                        activeClassName="actived"
                                        onClick={() => setActiveTab('home')}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="tab"
                                        activeClassName="actived"
                                        onClick={() => setActiveTab('messages')}
                                    >
                                        Shop
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
                                        onClick={() => setActiveTab('settings')}
                                    >
                                        Menu 2
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className={`tab-pane ${activeTab === 'home' ? 'active' : ''}`} id="home">
                                    <hr />
                                    <form
                                        className="form"
                                        onSubmit={handleSubmit}
                                    >
                                        {Object.entries(formData).map(([key, value]) => (
                                            <div className="form-group" key={key}>
                                                <div className="col-xs-6">
                                                    <label htmlFor={key}>
                                                        <h4>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
                                                    </label>
                                                    <input
                                                        type={key.includes('password') ? 'password' : 'text'}
                                                        className="form-control"
                                                        name={key}
                                                        id={key}
                                                        placeholder={key.replace(/([A-Z])/g, ' $1')}
                                                        title={`enter your ${key.replace(/([A-Z])/g, ' $1')}`}
                                                        value={value}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="form-group">
                                            <div className="col-xs-12">
                                                <br />
                                                <button className="btn btn-lg btn-success" type="submit">
                                                    <i className="glyphicon glyphicon-ok-sign" /> Save
                                                </button>
                                                <button className="btn btn-lg" type="reset">
                                                    <i className="glyphicon glyphicon-repeat" /> Reset
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <hr />
                                </div>
                                <div className={`tab-pane ${activeTab === 'messages' ? 'active' : ''}`} id="messages">
                                    <p>hello</p>
                                </div>
                                <div className={`tab-pane ${activeTab === 'settings' ? 'active' : ''}`} id="settings">
                                    <hr />
                                    <h3>Chức năng sẽ sớm ra mắt hehe</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;
