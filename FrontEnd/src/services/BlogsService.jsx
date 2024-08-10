import fetchData from './FetchData';
const api = "http://localhost:3000/";

const apiBlogs = `${api}api/blogs`;

const getAllBlogs = async () => {
    return await fetchData(apiBlogs);
};

export { 
    getAllBlogs
};