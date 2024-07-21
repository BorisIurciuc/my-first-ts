import { useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';

interface IProps {
    component: JSX.Element;
}

export default function ProtectedRoute({ component }: IProps) {
    const user = useAppSelector(state => state.authSlice.user);

    if (user?.username) {
        return component;
    }
    return <Navigate to="/auth" />;
}
