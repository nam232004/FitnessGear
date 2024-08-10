import { SnackbarProvider } from 'notistack';
import './AlertProvider.css';

const AlertProvider = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={2}
            iconVariant={{
                success: '✅',
                error: '✖️',
                warning: '⚠️',
                info: 'ℹ️',
                welcome: '🙌'
            }}
            autoHideDuration={3000}
            preventDuplicate
        >
            {children}
        </SnackbarProvider>
    );
};

export default AlertProvider;
