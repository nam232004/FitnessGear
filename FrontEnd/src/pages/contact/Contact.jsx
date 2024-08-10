const Contact = () => {
    return (
        <>
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone" />
                                <h4>Phone</h4>
                                <p>0347949004</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt" />
                                <h4>Address</h4>
                                <p>Chưa chỉnh sửa</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt" />
                                <h4>Open time</h4>
                                <p>10:00 am to 23:00 pm</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt" />
                                <h4>Email</h4>
                                <p>hello@colorlib.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.6894255449816!2d106.62607255337687!3d10.853862348467757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1722788416431!5m2!1svi!2s"
                    width="100%"
                    height={500}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex={0}
                />
                <div className="map-inside">
                    <i className="icon_pin" />
                    <div className="inside-widget">
                        <h4>QTSC 9 Building</h4>
                        <ul>
                            <li>Phone: +84-28-1234-5678</li>
                            <li>Add: Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</li>
                        </ul>
                    </div>
                </div>
            </div>


        </>



    );
}

export default Contact;