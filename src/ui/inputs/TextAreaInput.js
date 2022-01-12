import { ErrorMessage, useField } from "formik";

export const TextAreaInput = ({ className, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <textarea className={className} {...field} {...props} />
      <ErrorMessage
        name={props.name}
        component='span'
        className='error-message'
      />
    </>
  );
};

export default TextAreaInput;
