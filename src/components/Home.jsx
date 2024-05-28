import PageContent from './PageContent';
import imageLogo from '../img/logo.png';
import classes from './Home.module.css';

const Home = () => {
    return (
        <PageContent title="Welcome to MedShop!">
            <p>Here You can find and order medicines.</p>
            <img src={imageLogo} alt="" className={classes.main_img} />
        </PageContent>
    );
};

export default Home;
