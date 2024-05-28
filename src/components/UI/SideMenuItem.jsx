import { NavLink } from 'react-router-dom';

import classes from './SideMenuItem.module.css';
const SideMenuItem = ({ to, disabled, selected, ...rest }) => {
    console.log('selected: ', selected);
    let classNames = classes.disabled;
    if (selected) {
        classNames += ` ${classes.withCircle}`;
    }
    if (disabled) {
        return (
            <span
                {...rest}
                className={classNames}
                // className={`${classes.disabled}${selected ? ' ' + classes.withcirle : ''}`}
            />
        );
    }
    return <NavLink to={to} {...rest} />;
};

export default SideMenuItem;
