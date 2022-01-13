import styles from "./Savebutton.module.css";

export const SaveButton = ({ text, type = "button", ...rest }) => {
  return (
    <button className={styles.button} type={type} {...rest}>
      <span>{text}</span>
      <svg width='13px' height='10px' viewBox='0 0 13 10'>
        <path d='M1,5 L11,5'></path>
        <polyline points='8 1 12 5 8 9'></polyline>
      </svg>
    </button>
  );
};

export default SaveButton;
