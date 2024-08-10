
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/CategoriesService';
const HeroNormal = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const data = await getAllCategories();
                
                setCategories(data);
            } catch (error) {
                console.error('error fetching data', error);
            }
        };
        fetchCat();
    }, []);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
    const handleToggleCategories = () => {
        setIsCategoriesVisible(!isCategoriesVisible);
    };

    return (
        <>
            {/* Hero Section Begin */}
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={handleToggleCategories}>
                                    <i className="fa fa-bars" />
                                    <span>Danh mục</span>
                                </div>
                                {isCategoriesVisible && (
                                    <ul>
                                        {categories.map(cat => (
                                            <li key={cat.id}>
                                                <Link to={`/shop?category=${cat.name}`}>{cat.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        {/* <div className="hero__search__categories">
                                            All Categories
                                            <span className="arrow_carrot-down" />
                                        </div> */}
                                        <input type="text" placeholder="What do you need?" />
                                        <button type="submit" className="site-btn">
                                            Tìm kiếm
                                        </button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone" />
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>03479 49004</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section End */}
        </>

    );
}

export default HeroNormal;