import { Form, useSearchParams, Link, useNavigation, useActionData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './AuthForm.module.css';
import Button from '../UI/Button';

const AuthForm = () => {
    const selectedShop = useSelector((state) => state.shop).selectedShop;
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;
    const selectedProduct = useSelector((state) => state.filters).selectedProduct;
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const actionData = useActionData();
    const errors = {};

    if (actionData && actionData.data) {
        for (const error of actionData.data) {
            errors[error.path] = error.msg;
        }
    }

    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    let actionButtonTxt = '';

    if (isSubmitting) {
        actionButtonTxt = 'Submitting...';
    } else {
        actionButtonTxt = isLogin ? 'Login' : 'Signup';
    }

    return (
        <>
            <Form method="POST" className={classes.form}>
                <h3>{isLogin ? 'Login' : 'Signup'}</h3>
                <p>
                    {errors.generalError && (
                        <span className={classes.error}>{errors.generalError}</span>
                    )}
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    {errors.email && <span className={classes.error}>{errors.email}</span>}
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    {errors.password && <span className={classes.error}>{errors.password}</span>}
                    <input id="password" type="password" name="password" required />
                </p>
                {!isLogin && (
                    <p>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && (
                            <span className={classes.error}>{errors.confirmPassword}</span>
                        )}
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            required
                        />
                    </p>
                )}

                <input
                    type="hidden"
                    name="filters"
                    value={JSON.stringify({
                        selectedShop: selectedShop,
                        params: [
                            { key: 'cgid', value: selectedCategory },
                            { key: 'srule', value: selectedSortingRule },
                            { key: 'pid', value: selectedProduct },
                        ],
                    })}
                />

                <div className={classes.actions}>
                    <p>{isLogin ? 'Do not have an acount?' : 'Allready have an acount?'}</p>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'SignUp' : 'Login'}
                    </Link>
                    <Button disabled={isSubmitting}>{actionButtonTxt}</Button>
                </div>
            </Form>
        </>
    );
};

export default AuthForm;
