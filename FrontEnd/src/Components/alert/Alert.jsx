import { useSnackbar } from 'notistack';

const useAlertBar = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showAlertCart = (key) => {
        enqueueSnackbar(`Đã thêm ${key} vào giỏ hàng!`, {
            variant: "success",
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    const showAlertLogin = (key) => {
        enqueueSnackbar(`Chào mừng ${key}!`, {
            variant: "welcome",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    const showAlertRegister = () => {
        enqueueSnackbar(`Bạn đã đăng ký thành công`, {
            variant: "welcome",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    const showAlertSuccess = (message) => {
        enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    const showAlertError = (message) => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    return {showAlertCart, showAlertLogin, showAlertRegister, showAlertError, showAlertSuccess};
};

export default useAlertBar;
