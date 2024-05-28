import { Form, useNavigation, useActionData, NavLink } from 'react-router-dom';
import classes from './UserProfileForm.module.css';
import Button from '../UI/Button';

const UserProfileForm = ({ user }) => {
    const navigation = useNavigation();
    const actionData = useActionData();
    const errors = {};

    if (actionData && actionData.data) {
        for (const error of actionData.data) {
            errors[error.path] = error.msg;
        }
    }

    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method="POST" className={classes.form}>
                <h3>Your profile info</h3>
                <p>
                    <label htmlFor="fullName">Full Name</label>
                    {errors.email && <span className={classes.error}>{errors.email}</span>}
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        defaultValue={user ? user.fullName : ''}
                    />
                </p>
                <p>
                    <label htmlFor="address">Address</label>
                    {errors.email && <span className={classes.error}>{errors.email}</span>}
                    <input
                        id="address"
                        type="text"
                        name="address"
                        defaultValue={user ? user.address : ''}
                    />
                </p>
                <p>
                    <label htmlFor="phone">Phone</label>
                    {errors.email && <span className={classes.error}>{errors.email}</span>}
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        defaultValue={user ? user.phone : ''}
                    />
                </p>

                <div className={classes.actions}>
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </Button>
                </div>
            </Form>
            <div className={classes.order_history}>
                <NavLink to={'/order-history'}>
                    <h3>Get Your Order History</h3>
                </NavLink>
            </div>
        </>
    );
};

export default UserProfileForm;
