import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../ui/inputs/TextInput";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import styles from "./HRStyles.module.css";
import { useDispatch } from "react-redux";
import { ADD_HOTEL } from "../../../features/HotelRatesSlice";

const HotelRatesTable = ({ hotel }) => {
  const dispatch = useDispatch();
  const AccummulateHotelRates = (values, hotel) => {
    dispatch(ADD_HOTEL({ ...hotel, price: [values] }));
  };
  return (
    <>
      <Formik
        initialValues={{
          DUInr: "",
          DUIprice: "",
          breakfast: "",
          DoubleRoomNr: "",
          DoubleRoomPrice: "",
          DailyTax: "",
        }}
        onSubmit={(values) => {
          AccummulateHotelRates(values, hotel);
        }}
        validationSchema={Yup.object({
          DUInr: Yup.number(),
          DUIprice: Yup.number(),
          breakfast: Yup.number(),
          DoubleRoomNr: Yup.number(),
          DoubleRoomPrice: Yup.number(),
          DailyTax: Yup.number(),
        })}
      >
        {(formik) => (
          <Form className={styles.HR__form}>
            <fieldset>
              <div>
                <div>
                  <TextInput
                    label='Number of DUIs'
                    name='DUInr'
                    placeholder='Ex. 40'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Rate per DUI'
                    name='DUIprice'
                    placeholder='Rate per night per room'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Breakfast'
                    name='breakfast'
                    placeholder='If included, enter 0'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Number of Double Rooms'
                    name='DoubleRoomNr'
                    placeholder='Number of Double Rooms'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Rate per Double Room'
                    name='DoubleRoomPrice'
                    placeholder='Rate per night per room'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='City Tax'
                    name='DailyTax'
                    placeholder='City Tax p.person per night'
                    type='number'
                  />
                </div>
              </div>

              <div className='button'>
                <SaveButton type='submit' text='Save and continue' />
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default HotelRatesTable;
