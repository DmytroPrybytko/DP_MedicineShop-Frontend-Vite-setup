import { Suspense } from 'react';
import { json, defer, useLoaderData, Await, redirect } from 'react-router-dom';

import { getAuthToken } from '../util/auth';
import UserProfileForm from '../components/User/UserProfileForm';

const apiURL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
    const user = useLoaderData();
    console.log('user: ', user);
    return (
        <>
            <Suspense>
                <Await resolve={user}>
                    {(loadedUser) => <UserProfileForm user={loadedUser.user} />}
                </Await>
            </Suspense>
        </>
    );
};

export default UserProfilePage;

export const loadUserInfo = async () => {
    const token = getAuthToken();

    const response = await fetch(`${apiURL}user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('response: ', response);

    if (response.status === 422 || response.status === 401 || !response.ok) {
        const data = await response.json();
        throw json({ message: data.message }, { status: response.status });
    } else {
        const resData = await response.json();
        return resData;
    }
};

export const loader = async () => {
    return defer({
        user: await loadUserInfo(),
    });
};

export const action = async ({ request }) => {
    const token = getAuthToken();
    const data = await request.formData();
    const formData = Object.fromEntries(data.entries());

    const response = await fetch(`${apiURL}user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    if (response.status === 422 || response.status === 401) {
        console.log(response.status);
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate' }, { status: 500 });
    }

    const resData = await response.json();

    return redirect('/');
};
