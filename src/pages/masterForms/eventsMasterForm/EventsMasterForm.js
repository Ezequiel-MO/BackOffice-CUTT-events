import * as Yup from "yup";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Alert } from "@mui/material";
import { SaveButton } from "../../../ui/buttons/saveButton/SaveButton";
import { Icon } from "@iconify/react";
import { TextInput } from "../../../ui/inputs/TextInput";
import { TextAreaInput } from "../../../ui/inputs/TextAreaInput";
import "../../masterForms/styles.css";
import { submitForm } from "../../../helper/HelperFunctions/HelperFunctions";
import { useNavigate } from "react-router-dom";
import useGetVendors from "../../../hooks/useGetVendors";

export const EventsMasterForm = () => {
  const fileInput = useRef();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { vendorOptions: events } = useGetVendors("events");
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          city: "",
          titleSidebar: "",
          title: "",
          price: "",
          longitude: "",
          latitude: "",
          textContent: "",
          introduction: "",
        }}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, "events", events);
          setSuccess(true);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          titleSidebar: Yup.string().required("Required"),
          title: Yup.string().required("Required"),
          longitude: Yup.number().required("Required"),
          latitude: Yup.number().required("Required"),
          price: Yup.number().required("Required"),
          textContent: Yup.string().required("Required"),
          introduction: Yup.string(),
        })}
      >
        {(formik) => (
          <Form className='form'>
            {success && (
              <Alert
                severity='success'
                onClose={() => {
                  navigate("/");
                }}
              >
                Thanks for creating a new event!
              </Alert>
            )}
            <fieldset>
              <legend>
                <h4>General Event data</h4>
              </legend>
              <div className='form-inputs'>
                <div>
                  <TextInput
                    label='Name'
                    name='name'
                    placeholder='Name of Activity'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='City'
                    name='city'
                    placeholder='Event City'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Title Sidebar'
                    name='titleSidebar'
                    placeholder='Activity name'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Title'
                    name='title'
                    placeholder='Activity title'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Coords Longitude'
                    name='longitude'
                    placeholder='ex : 2.154007'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Coords Latitude'
                    name='latitude'
                    placeholder='ex : 41.390205'
                    type='number'
                  />
                </div>
                <div>
                  <TextInput
                    label='Activity Cost'
                    name='price'
                    placeholder='ex : 35'
                    type='number'
                  />
                </div>
                <div className='button'>
                  <SaveButton type='submit' text='Save and continue' />
                </div>
              </div>
              <div className='form-inputs'>
                <div>
                  <TextAreaInput
                    className='text-area-input-event'
                    name='introduction'
                    placeholder='Write an intro'
                    type='text'
                  />
                </div>
                <div>
                  <TextAreaInput
                    className='text-area-input-event'
                    name='textContent'
                    placeholder='Write a description'
                    type='text'
                  />
                </div>
                <div>
                  <label htmlFor='file-upload' className='custom-file-upload'>
                    <Icon icon='akar-icons:cloud-upload' width='40' />
                    <span>Upload Images</span>
                  </label>
                  <input
                    id='file-upload'
                    type='file'
                    ref={fileInput}
                    name='imageContentUrl'
                    multiple
                  />
                </div>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EventsMasterForm;
