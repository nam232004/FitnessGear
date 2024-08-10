import { useState } from 'react';
import {
    ForgotPasswordBody,
    ForgotPasswordContainer,
    ForgotPasswordTitle,
    ForgotPasswordForm,
    ForgotPasswordInput,
    ForgotPasswordButton,
    ForgotPasswordMessage
} from './FogotPassStyle';
import { forgotPassword } from '../../services/UsersService';
import useAlertBar from '../../Components/alert/Alert';

const ForgotPass = () => {
    const [forgot_email, set_forgot_email] = useState('');
    const [message, setMessage] = useState('');
    const { showAlertSuccess } = useAlertBar();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (!forgot_email) {
            setMessage('Email không được để trống.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(forgot_email)) {
            setMessage('Email không đúng định dạng.');
            return;
        }

        try {
            setMessage('')
            await forgotPassword(forgot_email);
            showAlertSuccess('Đã gửi liên kết đặt lại mật khẩu đến email của bạn.');
            set_forgot_email('');
        } catch (error) {
            console.error('Reset password error:', error);
            if (error.message.includes('Something went wrong!')) {
                setMessage('Không tìm thấy email.');
            } else {
                setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    return (
        <ForgotPasswordBody>
            <ForgotPasswordContainer>
                <ForgotPasswordTitle>Lấy lại mật khẩu đã quên</ForgotPasswordTitle>
                <ForgotPasswordForm onSubmit={handleResetPassword}>
                    <ForgotPasswordInput
                        type='text'
                        placeholder='Nhập email của bạn'
                        value={forgot_email}
                        onChange={(e) => set_forgot_email(e.target.value)}
                    />
                    <ForgotPasswordButton type='submit'>Gửi</ForgotPasswordButton>
                </ForgotPasswordForm>
                {message && <ForgotPasswordMessage>{message}</ForgotPasswordMessage>}
            </ForgotPasswordContainer>
        </ForgotPasswordBody>
    );
};

export default ForgotPass;
