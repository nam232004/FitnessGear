import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BillDetail.css';
import { getBillByEmail, getBillById, updateBillStatus } from '../../services/CheckoutService';
import useAlertBar from '../../Components/alert/Alert';

const BillDetail = () => {
    const { email } = useParams();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showAlertError, showAlertSuccess } = useAlertBar();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getBillByEmail(email);
                console.log(ordersData);
                setOrders(ordersData);
            } catch (err) {
                setError('Không thể lấy danh sách hóa đơn.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [email]);

    const handleShowModal = async (id_bill) => {
        try {
            const orderData = await getBillById(id_bill);
            setSelectedOrder(orderData);
            setModalOpen(true);
        } catch (err) {
            setError('Không thể lấy thông tin chi tiết hóa đơn.');
        }
    };

    const handleCloseModal = () => setModalOpen(false);

    const handleStopToOrder = async (id_bill) => {
        try {
            const orderData = await getBillById(id_bill);
            if (orderData.status !== "Chờ xác nhận") {
                showAlertError('Đơn hàng đang được xử lý, hủy thất bại!');
                return
            }
            await updateBillStatus(id_bill, 'Đã hủy');
            showAlertSuccess('Bạn đã hủy đơn hàng thành công!');

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id_bill === id_bill
                        ? { ...order, status: 'Đã hủy' }
                        : order
                )
            );
        } catch (err) {
            setError('Không thể cập nhật trạng thái đơn hàng.');
        }
    };
    const reOrther = async (id_bill) => {
        try {
            await updateBillStatus(id_bill, 'Chờ xác nhận');
            showAlertSuccess('Bạn đã đặt hàng thành công!');

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id_bill === id_bill
                        ? { ...order, status: 'Chờ xác nhận' }
                        : order
                )
            );
        } catch (err) {
            setError('Không thể cập nhật trạng thái đơn hàng.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section className="checkout spad">
                <div className="container mt-5">
                    <h2 className="mb-4">Danh sách hóa đơn</h2>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Thông tin khách hàng</h5>
                            {orders[0] && (
                                <>
                                    <p className="card-text"><strong>Tên:</strong> {orders[orders.length-1].customer_name}</p>
                                    <p className="card-text"><strong>Địa chỉ giao hàng:</strong> {orders[orders.length-1].customer_address}</p>
                                    <p className="card-text"><strong>Số điện thoại:</strong> {orders[orders.length-1].customer_phone}</p>
                                    <p className="card-text"><strong>Email:</strong> {orders[orders.length-1].customer_email}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Danh sách hóa đơn</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Mã đơn hàng</th>
                                        <th scope="col">Ngày mua</th>
                                        <th scope="col">Thành tiền</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        const totalAmount = order.goods.reduce((total, item) => total + (item.quantity * item.price), 0);
                                        const shipPrice = totalAmount * 0.1;
                                        return (
                                            <tr key={order.id_bill}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{order.id_bill}</td>
                                                <td>{order.order_date}</td>
                                                <td>{(totalAmount + shipPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-success'
                                                        onClick={() => handleShowModal(order.id_bill)}
                                                    >
                                                        <i className='fa fa-bars' />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {modalOpen && selectedOrder && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Chi tiết hóa đơn : #{selectedOrder.id_bill}</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Tên khách hàng:</strong> {selectedOrder.customer_name}</p>
                                    <p><strong>Địa chỉ:</strong> {selectedOrder.customer_address}</p>
                                    <p><strong>Số điện thoại:</strong> {selectedOrder.customer_phone}</p>
                                    <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                                    <p><strong>Ngày tạo:</strong> {selectedOrder.order_date}</p>
                                    <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                                    <h6>Danh sách sản phẩm:</h6>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col">Số lượng</th>
                                                <th scope="col">Đơn giá</th>
                                                <th scope="col">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.goods.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{(item.quantity * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <h6><label>Phí vận chuyển (10%):</label> {(selectedOrder.totalCartMoney / 11).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                                    <h5><strong>Tổng cộng:</strong> {selectedOrder.totalCartMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                </div>
                                <div className="modal-footer">
                                    {selectedOrder.status === 'Đã hủy'
                                        ? <button type="button" className="btn btn-success" onClick={() => reOrther(selectedOrder.id_bill)}>Đặt hàng lại</button>
                                        : <button type="button" className="btn btn-danger" onClick={() => handleStopToOrder(selectedOrder.id_bill)}>Hủy đơn hàng</button>
                                    }
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default BillDetail;
