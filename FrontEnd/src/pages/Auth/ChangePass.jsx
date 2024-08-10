import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChangePassBody,
    ChangePassContainer,
    ChangePassTitle,
    ChangePassForm,
    ChangePassInput,
    ChangePassButton,
    ChangePassMessage
} from './ChangePassStyle';
import useAlertBar from '../../Components/alert/Alert';
import { changePassword } from '../../services/UsersService';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { showAlertSuccess } = useAlertBar();
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();
        setMessage('');
        if (!newPassword || !confirmPassword) {
            setMessage('Tất cả các trường đều là bắt buộc.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            setMessage('Mật khẩu đã được thay đổi thành công.');
            showAlertSuccess('Đã đổi mật khẩu thành công!')
            navigate('/login');
            await changePassword(token, newPassword);

        } catch (error) {
            console.error('Change password error:', error);
            setMessage('Vui lòng thử lại.');
        }
    };

    return (
        <ChangePassBody>
            <ChangePassContainer>
                <ChangePassTitle>Thay đổi mật khẩu</ChangePassTitle>
                <ChangePassForm onSubmit={handleChangePassword}>
                    <ChangePassInput
                        type='password'
                        placeholder='Mật khẩu mới'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <ChangePassInput
                        type='password'
                        placeholder='Xác nhận mật khẩu mới'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <ChangePassButton type='submit'>Thay đổi mật khẩu</ChangePassButton>
                </ChangePassForm>
                {message && <ChangePassMessage>{message}</ChangePassMessage>}
            </ChangePassContainer>
        </ChangePassBody>
    );
};

export default ChangePassword;
