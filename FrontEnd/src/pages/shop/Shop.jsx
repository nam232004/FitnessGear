import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllProducts, getProductsByCategoryName, getProductsByPriceRange, getProductsByCategoryNameAndPriceRange } from '../../services/ProductsService';
import { getAllCategories } from '../../services/CategoriesService';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import './Shop.css';
import ProductCard from '../../Components/products/Products';
import ReactPaginate from 'react-paginate';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({
        minPrice: searchParams.get('minPrice'),
        maxPrice: searchParams.get('maxPrice')
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 9;

    const filterPriceZones = [
        { minPrice: null, maxPrice: null, label: 'Tất cả' },
        { minPrice: 1, maxPrice: 1000000, label: '0 - 1.000.000 VNĐ' },
        { minPrice: 1000000, maxPrice: 1500000, label: '1.000.000 - 1.500.000 VNĐ' },
        { minPrice: 1500000, maxPrice: 2000000, label: '1.500.000 - 2.000.000 VNĐ' },
        { minPrice: 2000000, maxPrice: 2500000, label: '2.000.000 - 2.500.000 VNĐ' },
        { minPrice: 2500000, maxPrice: 3000000, label: '2.500.000 - 3.000.000 VNĐ' },
        { minPrice: 3000000, maxPrice: 9999999, label: '3.000.000 VNĐ Trở lên' }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const categoryName = searchParams.get('category');
                const minPrice = priceRange.minPrice;
                const maxPrice = priceRange.maxPrice;

                // let data;
                let option = '';

                if (categoryName && minPrice && maxPrice) {
                    option = 'categoryAndPrice';
                } else if (categoryName) {
                    option = 'category';
                } else if (minPrice && maxPrice) {
                    option = 'price';
                } else {
                    option = 'all';
                }

                const allProducts = await fetchAllProducts(option, categoryName, minPrice, maxPrice);
                setTotalProducts(allProducts.length);

                const pageCount = Math.ceil(allProducts.length / productsPerPage);
                if (currentPage >= pageCount && pageCount > 0) {
                    setCurrentPage(0); 
                }

                const paginatedProducts = allProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);
                setProducts(paginatedProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
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

        const fetchAllProducts = async (option, categoryName, minPrice, maxPrice) => {
            switch (option) {
                case 'categoryAndPrice':
                    return await getProductsByCategoryNameAndPriceRange(categoryName, minPrice, maxPrice);
                case 'category':
                    return await getProductsByCategoryName(categoryName);
                case 'price':
                    return await getProductsByPriceRange(minPrice, maxPrice);
                case 'all':
                default:
                    return await getAllProducts();
            }
        };

        fetchCategories();
        fetchProducts();
    }, [searchParams, currentPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handlePriceFilterChange = (minPrice, maxPrice) => {
        setPriceRange({ minPrice, maxPrice });
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('minPrice', minPrice);
            newParams.set('maxPrice', maxPrice);
            return newParams;
        });
        setCurrentPage(0); 
    };

    const handleCategoryChange = (category) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('category', category);
            return newParams;
        });
        setCurrentPage(0); 
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
                                <h2 className='text-shadow'>Organi Shop</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item">
                                    <h4>Department</h4>
                                    <ul>
                                        <li>
                                            <Link to="/shop">Tất cả</Link>
                                        </li>
                                        {categories.map(cat => (
                                            <li key={cat.id}>
                                                <Link
                                                    className='custom-link'
                                                    to={`/shop?category=${cat.name}`}
                                                    onClick={() => handleCategoryChange(cat.name)}
                                                >
                                                    {cat.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Price</h4>
                                    <div className='custom-radio'>
                                        {filterPriceZones.map((price, index) => (
                                            <div key={index}>
                                                <input
                                                    type="radio"
                                                    id={`price-${index}`}
                                                    name="price-filter"
                                                    checked={price.minPrice === priceRange.minPrice && price.maxPrice === priceRange.maxPrice}
                                                    onChange={() => handlePriceFilterChange(price.minPrice, price.maxPrice)}
                                                />
                                                <label htmlFor={`price-${index}`}>{price.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            <div className="row">
                                {/* product card */}
                                {products.map(pro => (
                                    <ProductCard key={pro.id} product={pro} columnClass="col-lg-4 col-md-6 col-sm-6" />
                                ))}
                                {/*end product card */}
                            </div>
                            <ReactPaginate
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(totalProducts / productsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;
