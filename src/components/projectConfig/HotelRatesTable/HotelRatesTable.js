import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../ui/inputs/TextInput";
import SaveButton from "../../../ui/Button/SaveButton";

const HotelRatesTable = ({ hotels }) => {
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
          console.log("event ", values);
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
          <Form className='form'>
            <div className='form-inputs'>
              <table>
                <thead>
                  {hotels.map((hotel) => (
                    <th align='right' key={hotel._id}>
                      {hotel.name}
                    </th>
                  ))}
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <>
                      <tr key={hotel._id}>
                        <td>
                          <TextInput
                            label='Number of DUI rooms'
                            name='DUInr'
                            placeholder='Nr. of DUIS'
                            type='number'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextInput
                            label='Rate per DUI room'
                            name='DUIprice'
                            placeholder='Per Room per night'
                            type='number'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextInput
                            label='Breakfast'
                            name='breakfast'
                            placeholder='If not included in room rate'
                            type='number'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextInput
                            label='Number of Double rooms'
                            name='DoubleRoomNr'
                            placeholder='Double/Twin rooms'
                            type='number'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextInput
                            label='Rate per Double/Twin room'
                            name='DoubleRoomPrice'
                            placeholder='Per room per night'
                            type='number'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextInput
                            label='Daily Tax '
                            name='DailyTax'
                            placeholder='City tax p.person p.night'
                            type='number'
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

              <div className='button'>
                <SaveButton type='submit' text='Save and continue' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default HotelRatesTable;
