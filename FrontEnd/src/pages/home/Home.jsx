import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, NavLink } from 'react-router-dom';
import { getHotProducts, getProductsByCategoryName } from '../../services/ProductsService';
import { getAllCategories } from '../../services/CategoriesService';
import './Home.css';
import ProductCard from '../../Components/products/Products';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = categoryName
                    ? await getProductsByCategoryName(categoryName)
                    : await getHotProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, [categoryName, location]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            {/* Categories Section Begin */}
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <div className='col-lg-12'>
                            <div className="section-title">
                                <h2>Danh mục</h2>
                            </div>
                        </div>
                        {categories.slice(0, 4).map(cat => (
                            <div className="col-lg-3" key={cat.id}>
                                <div
                                    className="categories__item set-bg"
                                    style={{ backgroundImage: `url(http://localhost:3000/images/${cat.img})` }}
                                >
                                    <h5>
                                        <Link to={`/shop?category=${cat.name}`}>{cat.name}</Link>
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Categories Section End */}

            {/* Featured Section Begin */}
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <ul className='nav'>
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link custom-color" activeClassName="active">Tất cả</NavLink>
                                    </li>
                                    {categories.map(cat => (
                                        <li className="nav-item" key={cat.id}>
                                            <NavLink className='nav-link custom-color' activeClassName="active" to={`/home/category/${cat.name}`}>{cat.name}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {products.slice(0, 8).map(pro => (
                            <ProductCard key={pro.id} product={pro} columnClass="col-lg-3 col-md-6 col-sm-6" />
                        ))}
                    </div>
                    <div className='d-flex justify-content-center py-0'>
                        <ul className='nav'>
                            <li className="nav-item">
                                <Link to="/shop" className="nav-link custom-color">Xem thêm <i className="fa fa-angle-double-right"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* Featured Section End */}

            {/* Banner Begin */}
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="http://localhost:3000/images/banner_1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="http://localhost:3000/images/banner_2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}

            {/* Latest Product Section Begin */}
            <section className="latest-product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-6">
                            <div className="latest-product__text">
                                <h4>Latest Products</h4>
                                <Slider {...sliderSettings}>
                                    {products.slice(0, 3).map(pro => (
                                        <div className="latest-product__slider__item" key={pro.id}>
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src={`http://localhost:3000/images/${pro.img}`} alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>{pro.name}</h6>
                                                    <span>{pro.price}</span>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        {/* Similar sections for Top Rated Products and Review Products */}
                    </div>
                </div>
            </section>
            {/* Latest Product Section End */}

            {/* Blog Section Begin */}
            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>From The Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="http://localhost:3000/images/blog-1.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o" /> May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o" /> 5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">Cooking tips make cooking simple</a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt ut labore et dolore
                                        magnam aliquam quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="http://localhost:3000/images/blog-2.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o" /> May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o" /> 5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">Cooking tips make cooking simple</a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt ut labore et dolore
                                        magnam aliquam quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="http://localhost:3000/images/blog-3.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o" /> May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o" /> 5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">Cooking tips make cooking simple</a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt ut labore et dolore
                                        magnam aliquam quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Section End */}
        </>
    );
}

export default Home;
