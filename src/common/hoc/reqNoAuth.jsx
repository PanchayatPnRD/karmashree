import React from 'react'
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../rdxsga/redux/slices/userSlice';
import { Navigate } from 'react-router-dom';
import { ALLOWED_USER_TYPE, APP_LINK } from '../../config';
import FullScreen from '../layout/FullScreen';

function reqNoAuthLayout(Component) {
    function HocLayout(props) {
        const user = useSelector(userDetailsSelector);
        return (
            !user?.isAuthenticated || user?.user?.user_type !== ALLOWED_USER_TYPE ? <FullScreen>
                <Component {...props} />
            </FullScreen> : <Navigate to={APP_LINK.DASHBOARD} />
        )
    }
    return <HocLayout />
}

export default reqNoAuthLayout
