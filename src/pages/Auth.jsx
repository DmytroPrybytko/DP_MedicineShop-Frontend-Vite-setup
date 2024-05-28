import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import { createSearchParamsString } from '../util/URLUtils';

const apiURL = import.meta.env.VITE_API_URL;

const AuthPage = () => {
    return <AuthForm />;
};

export default AuthPage;

export const action = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Invalid login mode.' }, { status: 422 });
    }

    const url = `${apiURL}auth/${mode}`;
    const data = await request.formData();
    const formData = Object.fromEntries(data.entries());

    const { filters, ...authData } = formData;

    const response = await fetch(url, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        console.log(response.status);
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Can not authenticate' }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    if (token) {
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());
    }

    const { selectedShop, params } = JSON.parse(filters);

    let redirectUrl = selectedShop
        ? `/shop/${selectedShop}${createSearchParamsString(params)}`
        : `/shop${createSearchParamsString(params)}`;

    return redirect(redirectUrl);
};
