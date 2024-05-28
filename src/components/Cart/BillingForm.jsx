// import { Form, json, redirect } from 'react-router-dom';
import { forwardRef } from 'react';

import classes from './BillingForm.module.css';
import Button from '../UI/Button';

const BillingForm = forwardRef(({ user }, ref) => {
    return (
        <>
            <form method="POST" className={classes.form} ref={ref}>
                <h3>Your Billing Info</h3>
                <p>
                    <label htmlFor="fullName">Name</label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        defaultValue={user ? user.fullName : ''}
                    />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        defaultValue={user ? user.email : ''}
                    />
                </p>
                <p>
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        required
                        defaultValue={user ? user.address : ''}
                    />
                </p>
                <p>
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        required
                        defaultValue={user ? user.phone : ''}
                    />
                </p>
                <input type="hidden" name="_id" defaultValue={user ? user._id : ''} />
                {/* <div className={classes.actions}>
                    <Button>Place an Order</Button>
                </div> */}
            </form>
        </>
    );
});

export default BillingForm;
