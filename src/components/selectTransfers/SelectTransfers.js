import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectInput from "../../ui/inputs/SelectInput";

const SelectTransfers = ({ city }) => {
  return (
    <div>
      <h2>
        Transfers for <span>{city}</span>
      </h2>
      <Formik
        initialValues={{
          vendor: "",
        }}
        onSubmit={(values) => {
          console.log("values=>", values);
        }}
        validationSchema={Yup.object({
          vendor: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <Form className='form'>
            <SelectInput name='vendor'>
              <option value=''>Select a vendor</option>
              <option value='1'>Vendor 1</option>
              <option value='2'>Vendor 2</option>
            </SelectInput>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectTransfers;
