import { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/BlogsService";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAllBlogs();
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
    }, [])

    return (
        <section className="blog spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="blog__sidebar">
                            <div className="blog__sidebar__search">
                                <form action="#">
                                    <input type="text" placeholder="Search..." />
                                    <button type="submit">
                                        <span className="icon_search" />
                                    </button>
                                </form>
                            </div>
                            <div className="blog__sidebar__item">
                                <h4>Categories</h4>
                                <ul>
                                    <li>
                                        <a href="#">All</a>
                                    </li>
                                    <li>
                                        <a href="#">Beauty (20)</a>
                                    </li>
                                    <li>
                                        <a href="#">Food (5)</a>
                                    </li>
                                    <li>
                                        <a href="#">Life Style (9)</a>
                                    </li>
                                    <li>
                                        <a href="#">Travel (10)</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="blog__sidebar__item">
                                <h4>Recent News</h4>
                                <div className="blog__sidebar__recent">
                                    <a href="#" className="blog__sidebar__recent__item">
                                        <div className="blog__sidebar__recent__item__pic">
                                            <img src="http://localhost:3000/images/sr-1.jpg" alt="" />
                                        </div>
                                        <div className="blog__sidebar__recent__item__text">
                                            <h6>
                                                09 Kinds Of Vegetables
                                                <br /> Protect The Liver
                                            </h6>
                                            <span>MAR 05, 2019</span>
                                        </div>
                                    </a>
                                    <a href="#" className="blog__sidebar__recent__item">
                                        <div className="blog__sidebar__recent__item__pic">
                                            <img src="http://localhost:3000/images/sr-2.jpg" alt="" />
                                        </div>
                                        <div className="blog__sidebar__recent__item__text">
                                            <h6>
                                                Tips You To Balance
                                                <br /> Nutrition Meal Day
                                            </h6>
                                            <span>MAR 05, 2019</span>
                                        </div>
                                    </a>
                                    <a href="#" className="blog__sidebar__recent__item">
                                        <div className="blog__sidebar__recent__item__pic">
                                            <img src="http://localhost:3000/images/sr-3.jpg" alt="" />
                                        </div>
                                        <div className="blog__sidebar__recent__item__text">
                                            <h6>
                                                4 Principles Help You Lose <br />
                                                Weight With Vegetables
                                            </h6>
                                            <span>MAR 05, 2019</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="blog__sidebar__item">
                                <h4>Search By</h4>
                                <div className="blog__sidebar__item__tags">
                                    <a href="#">Apple</a>
                                    <a href="#">Beauty</a>
                                    <a href="#">Vegetables</a>
                                    <a href="#">Fruit</a>
                                    <a href="#">Healthy Food</a>
                                    <a href="#">Lifestyle</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="row">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="blog__item">
                                        <div className="blog__item__pic">
                                            <img src={`http://localhost:3000/images/${blog.img}`} alt="" />
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
                                                <a href="#">{blog.name}</a>
                                            </h5>
                                            <p>
                                                {blog.content}
                                            </p>
                                            <a href="#" className="blog__btn">
                                                READ MORE <span className="arrow_right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="col-lg-12">
                                <div className="product__pagination blog__pagination">
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <a href="#">
                                        <i className="fa fa-long-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Blogs;