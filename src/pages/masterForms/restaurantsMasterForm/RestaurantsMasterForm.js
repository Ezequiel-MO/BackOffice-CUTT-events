import * as Yup from "yup";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Alert } from "@mui/material";
import { SaveButton } from "../../../ui/buttons/saveButton/SaveButton";
import { Icon } from "@iconify/react";
import { TextInput } from "../../../ui/inputs/TextInput";
import { TextAreaInput } from "../../../ui/inputs/TextAreaInput";
import "../../masterForms/styles.css";
import {
  fillFormData,
  transformValues,
} from "../../../helper/HelperFunctions/HelperFunctions";
import { useNavigate } from "react-router-dom";
import { selectUserIsLoggedIn } from "../../../features/UserLoggedInSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { newBaseURL } from "../../../helper/axios";

export const RestaurantsMasterForm = () => {
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn);
  const fileInput = useRef();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const PostToEndpoint = async (data, endpoint) => {
    try {
      const response = await axios.post(`${newBaseURL}v1/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${userIsLoggedIn.token}`,
          "Content-Type": "multipart/form-data",
          mode: "no-cors",
        },
      });
      setSuccess(true);
      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };

  const submitForm = (values, files, endpoint) => {
    const transformedValues = transformValues(values);
    const dataToPost = fillFormData(transformedValues, files);
    PostToEndpoint(dataToPost, endpoint);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          city: "",
          longitude: "",
          latitude: "",
          price: "",
          textContent: "",
          introduction: "",
        }}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, "restaurants");
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          longitude: Yup.number().required("Required"),
          latitude: Yup.number().required("Required"),
          price: Yup.number().required("Required"),
          textContent: Yup.string().required("Required"),
          introduction: Yup.string(),
        })}
      >
        {(formik) => (
          <Form className="form">
            {success && (
              <Alert
                severity="success"
                onClose={() => {
                  navigate("/");
                }}
              >
                Thanks for creating a new restaurant!
              </Alert>
            )}
            <fieldset>
              <legend>
                <h4>General Restaurant data</h4>
              </legend>
              <div className="form-inputs">
                <div>
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Restaurant Name"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Restaurant City"
                    type="text"
                  />
                </div>
                <div>
                  <TextInput
                    label="Coords Longitude"
                    name="longitude"
                    placeholder="ex : 2.154007"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="Coords Latitude"
                    name="latitude"
                    placeholder="ex : 41.390205"
                    type="number"
                  />
                </div>
                <div>
                  <TextInput
                    label="3-Course Menu Cost"
                    name="price"
                    placeholder="ex : 35"
                    type="number"
                  />
                </div>
                <div className="button">
                  <SaveButton type="submit" text="Save and continue" />
                </div>
              </div>
              <div className="form-inputs">
                <div>
                  <TextAreaInput
                    className="text-area-input-restaurant"
                    name="introduction"
                    placeholder="Write an intro"
                    type="text"
                  />
                </div>
                <div>
                  <TextAreaInput
                    className="text-area-input-restaurant"
                    name="textContent"
                    placeholder="Write a description"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <Icon icon="akar-icons:cloud-upload" width="40" />
                    <span>Upload Images</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    ref={fileInput}
                    name="imageContentUrl"
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

export default RestaurantsMasterForm;
