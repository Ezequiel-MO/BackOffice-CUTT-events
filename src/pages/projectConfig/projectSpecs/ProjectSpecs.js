import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../../ui/inputs/TextInput";
import { SaveButton } from "../../../ui/buttons/saveButton/SaveButton";
import { checkCodeIsUnique } from "../../../helper/HelperFunctions/HelperFunctions";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { baseURL, baseAPI } from "../../../helper/axios.js";
import { useDispatch } from "react-redux";
import {
  SET_CITY,
  SET_PROJECT_STATUS,
} from "../../../features/ProjectStatusSlice";
import "./styles.css";
import { Alert } from "@mui/material";

export const ProjectSpecs = () => {
  const dispatch_ProjectStatus = useDispatch();
  const navigate = useNavigate();
  const {
    data: { projects: DBprojects },
  } = useAxiosFetch(`${baseURL}/projects`);
  const [alertStatus, setAlertStatus] = useState("");

  const PostProject = (project) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(project)) {
      formData.append(key, value);
    }
    baseAPI
      .post("/projects", formData)
      .then((res) => console.log("res=>", res))
      .catch((err) => console.log(err));
    dispatch_ProjectStatus(SET_PROJECT_STATUS(project["code"]));
    dispatch_ProjectStatus(SET_CITY(project["groupLocation"]));
    setAlertStatus("success");
  };

  return (
    <>
      <Formik
        initialValues={{
          code: "",
          accountManager: "",
          groupName: "",
          groupLocation: "",
          arrivalDay: "",
          departureDay: "",
          nrPax: 0,
          clientCo: "",
          clientAccManager: "",
        }}
        onSubmit={(values) => {
          let codeIsUnique = checkCodeIsUnique(values.code, DBprojects);
          if (codeIsUnique) {
            PostProject(values);
          } else {
            setAlertStatus("error");
          }
        }}
        validationSchema={Yup.object({
          code: Yup.string()
            .min(10, "Must be 10 characters or more")
            .required("Required"),
          accountManager: Yup.string() /* .required("Required") */,
          groupName: Yup.string() /* .required("Required") */,
          groupLocation: Yup.string().required("Required"),
          arrivalDay: Yup.date() /* .required("Required").nullable()*/,
          departureDay: Yup.date() /* .required("Required") */,
          nrPax: Yup.number() /* .required("Required") */,
          clientCo: Yup.string() /* .required("Required") */,
          clientAccManager: Yup.string() /* .required("Required") */,
        })}
      >
        {(formik) => (
          <Form className='form'>
            {alertStatus === "error" && (
              <Alert severity='error'>
                Code is not unique, please choose another one
              </Alert>
            )}
            {alertStatus === "success" && (
              <Alert
                severity='success'
                onClose={() => {
                  navigate("/hotels");
                }}
              >
                Project created successfully!
              </Alert>
            )}
            <fieldset>
              <legend>
                <h4>About the Project</h4>
              </legend>
              <div className='form-inputs'>
                <div>
                  <TextInput
                    label='code'
                    name='code'
                    placeholder='BEM2021001'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Account Manager'
                    name='accountManager'
                    placeholder='John Doe'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Group Name'
                    name='groupName'
                    placeholder='Pfizer'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Group Location'
                    name='groupLocation'
                    placeholder='Barcelona'
                    type='text'
                  />
                </div>
                <div>
                  <label htmlFor='arrivalDay'>Arrival Day</label>
                  <Field name='arrivalDay' type='date' />
                  <ErrorMessage name='arrivalDay' component='span' />
                </div>
                <div>
                  <label htmlFor='departureDay'>Departure Day</label>
                  <Field name='departureDay' type='date' />
                  <ErrorMessage name='departureDay' component='span' />
                </div>

                <div>
                  <label htmlFor='nrPax'>Number of Pax</label>
                  <Field name='nrPax' type='number' />
                  <ErrorMessage name='nrPax' component='span' />
                </div>
                <div>
                  <TextInput
                    label='Client Agency'
                    name='clientCo'
                    placeholder='Roar Event Mngmt'
                    type='text'
                  />
                </div>
                <div>
                  <TextInput
                    label='Client Account Manager'
                    name='clientAccManager'
                    placeholder='Jonas Smith'
                    type='text'
                  />
                </div>
              </div>
              <div className='save-button'>
                <SaveButton type='submit' text='Save and continue' />
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProjectSpecs;
