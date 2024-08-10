import fetchData from './FetchData';
const api = "http://localhost:3000/";

const apiCategories = `${api}api/categories`;

const getAllCategories = async () => {
    return await fetchData(apiCategories);
};

export { 
    getAllCategories
};