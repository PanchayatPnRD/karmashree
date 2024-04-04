import React from 'react'
import DefaultLayout from '../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../rdxsga/redux/slices/userSlice';
import { Navigate } from 'react-router-dom';
import { ALLOWED_USER_TYPE, APP_LINK } from '../../config';

function reqAuthLayout(Component) {
    function HocLayout(props) {
        const user = useSelector(userDetailsSelector);
        return (
            user?.isAuthenticated && user?.user?.user_type === ALLOWED_USER_TYPE ? <DefaultLayout>
                <Component {...props} />
            </DefaultLayout> : <Navigate to={APP_LINK.LOGIN} />
        )
    }
    return <HocLayout />
}

export default reqAuthLayout
