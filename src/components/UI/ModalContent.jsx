import classes from './ModalContent.module.css';
import Button from './Button';

const ModalContent = ({ title, onConfirm, btnText, children }) => {
  return (
    <div className={classes.error}>
      <h2>{title}</h2>
        {children}
      {onConfirm && (
        <div id="confirmation-actions">
          <Button onClick={onConfirm}>
            {btnText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
