import fetchData from './FetchData';
const api = "http://localhost:3000/";

const apiProducts = `${api}api/products`; // get all
const apiProduct = `${api}api/product/`; // get pro by id
const apiProductsHot = `${api}api/products/hot`; // get hot pro
const apiProByCatId = `${api}api/products/categoryId/`; // get by cate id
const apiProByCatName = `${api}api/products/categoryName`; // get by cate name
const apiProByPrice = `${api}api/products/filter`; // get by price
const apiProByCatNameAndPrice = `${api}api/products/filter`; // get by cat name and price


const getAllProducts = async () => {
    return await fetchData(apiProducts);
};
    
const getProductById = async (id) => {
    return await fetchData(`${apiProduct}${id}`);
};

const getHotProducts = async () => {
    return await fetchData(apiProductsHot);
};

const getProductsByCategoryId = async (categoryId) => {
    return await fetchData(`${apiProByCatId}${categoryId}`);
};

const getProductsByCategoryName = async (categoryName) => {
    return await fetchData(`${apiProByCatName}/${categoryName}`);
};

const getProductsByPriceRange = async (minPrice, maxPrice) => {
    return await fetchData(`${apiProByPrice}/${minPrice}-${maxPrice}`);
};

const getProductsByCategoryNameAndPriceRange = async (categoryName, minPrice, maxPrice) => {
    return await fetchData(`${apiProByCatNameAndPrice}/${categoryName}/${minPrice}-${maxPrice}`);
};

export {
    getAllProducts,
    getProductById,
    getHotProducts,
    getProductsByCategoryId,
    getProductsByCategoryName,
    getProductsByPriceRange,
    getProductsByCategoryNameAndPriceRange
};
