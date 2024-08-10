import { useState } from "react";
import * as Components from './LoginStyle';
import { loginUser, registerUser } from '../../services/UsersService';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAlertBar from "../../Components/alert/Alert";

const Login = () => {
    const [signIn, toggle] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { showAlertLogin, showAlertRegister } = useAlertBar();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!username || !email || !password || !repass) {
            setError({ register: 'Không được để trống.' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError({ email: 'Email không đúng định dạng.' });
            return;
        }

        if (password !== repass) {
            setError({ repass: 'Mật khẩu không khớp.' });
            return;
        }

        try {
            await registerUser(username, email, password);
            setError({});
            setRepass('');
            setUsername('');
            setEmail('');
            setPassword('');
            showAlertRegister();
            toggle(true);
        } catch (error) {
            console.log('Fetch error:', error.message);

            if (error.message.includes('Email đã tồn tại')) {
                setError({ existingEmail: 'Email đã tồn tại' });
            } else {
                setError({ register: 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.' });
            }
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError({ login: 'Email và mật khẩu không được để trống.' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError({ email: 'Email không đúng định dạng.' });
            return;
        }

        try {
            const response = await loginUser(email, password);
            const data = typeof response === 'string' ? JSON.parse(response) : response;
            console.log(data.user.id);
            Cookies.set('accessToken', data.accessToken, { expires: 1 });
            Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
            Cookies.remove('customerEmail');
            showAlertLogin(data.user.name);
            navigate('/');
        } catch (error) {
            setError({ login: 'Email hoặc mật khẩu không chính xác!' });
            console.error('Login error:', error);
        }
    };

    return (
        <Components.Body>
            <Components.Container>
                <Components.SignUpContainer $signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Tạo tài khoản</Components.Title>
                        <Components.Input
                            type='text'
                            placeholder='Tên đăng nhập'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small className="text-danger">
                            {error.email && error.email}
                            {error.existingEmail && error.existingEmail}
                        </small>
                        <Components.Input
                            type='password'
                            placeholder='Mật khẩu'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Nhập lại mật khẩu'
                            value={repass}
                            onChange={(e) => setRepass(e.target.value)}
                        />
                        <small className="text-danger">
                            {error.repass && error.repass}
                            {error.register && error.register}
                        </small>
                        <Components.Button onClick={handleRegister}>Đăng ký</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer $signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Đăng nhập</Components.Title>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small className="text-danger">
                            {error.email && error.email}
                        </small>
                        <Components.Input
                            type='password'
                            placeholder='Mật khẩu'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <small className="text-danger">
                            {error.login && error.login}
                        </small>
                        <Components.Anchor>
                            <Link to={'/forgot_password'}>
                                Quên mật khẩu?
                            </Link>
                        </Components.Anchor>
                        <Components.Button onClick={handleLogin}>Đăng nhập</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer $signinIn={signIn}>
                    <Components.Overlay $signinIn={signIn}>
                        <Components.LeftOverlayPanel $signinIn={signIn}>
                            <Components.Title style={{ color: '#fff' }}>Đã có tài khoản?</Components.Title>
                            <Components.Paragraph>
                                Đăng nhập ngay!
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Đăng nhập
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel $signinIn={signIn}>
                            <Components.Title style={{ color: '#fff' }}>Chưa có tài khoản?</Components.Title>
                            <Components.Paragraph>
                                Đăng ký để có trải nghiệm tốt hơn
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Đăng ký
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Body>
    );

};

export default Login;
