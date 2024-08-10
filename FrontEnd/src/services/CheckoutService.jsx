import fetchData from './FetchData';
const api = "http://localhost:3000/";

const apiBills = `${api}api/bills`;
const apiBillById = `${api}api/bill/`;
const apiBillByEmail = `${api}api/bills/`;
const apiAddBill = `${api}api/bills/add`;
const apiUpdateBillStatus = `${api}api/bill/`;

const getBills = async () => {
    return await fetchData(apiBills);
};

const getBillByEmail = async (email) => {
    return await fetchData(`${apiBillByEmail}${email}`);
};

const getBillById = async (id) => {
    return await fetchData(`${apiBillById}${id}`);
};

const addBill = async (id_bill, customer_name, customer_address, customer_phone, customer_email, totalCartMoney, method, status, order_date, goods) => {
    const data = { id_bill, customer_name, customer_address, customer_phone, customer_email, totalCartMoney, method, status, order_date, goods };
    return await fetchData(apiAddBill, 'POST', data);
};

const updateBillStatus = async (id_bill, status) => {
    const data = { status };
    return await fetchData(`${apiUpdateBillStatus}${id_bill}/updateStatus`, 'PUT', data);
};

export {
    getBills,
    getBillById,
    getBillByEmail,
    addBill,
    updateBillStatus
};
