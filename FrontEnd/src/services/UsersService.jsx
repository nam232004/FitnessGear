import fetchData from './FetchData';
const api = "http://localhost:3000/";

const apiUsers = `${api}api/users`;
const apiUser = `${api}api/user`;
const apiUserLogin = `${api}api/users/login`;
const apiUserRegister = `${api}api/users/add`;

const apiForgotPassword = `${api}api/forgotPass`;
const apiChangePassword = `${api}api/changePass`;

const getAllUsers = async () => {
    return await fetchData(apiUsers);
};

const getUserById = async (id) => {
    return await fetchData(`${apiUser}/${id}`);
};

// Đăng nhập người dùng
const loginUser = async (email, password) => {
    const data = { email, password };
    return await fetchData(apiUserLogin, 'POST', data);
};

// Đăng ký người dùng
const registerUser = async (name, email, password) => {
    const data = { name, email, password };
    return await fetchData(apiUserRegister, 'POST', data);
};

const forgotPassword = async (forgot_email) => {
    const data = { forgot_email };
    return await fetchData(apiForgotPassword, 'POST', data);
};

const changePassword = async (token, newPassword) => {
    const data = { new_password: newPassword };
    return await fetchData(`${apiChangePassword}/${token}`, 'POST', data);
};

export {
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    forgotPassword,
    changePassword
};