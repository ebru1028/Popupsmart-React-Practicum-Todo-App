import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./userCreateValidation";
import ReactLoading from "react-loading";

export default function TodoCreateForm({closeModal}) {
  const [loadingIsOpen, setLoadingIsOpen] = React.useState(false);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: async (values) => {
        setLoadingIsOpen(true);
        localStorage.setItem('user', values.name);
        setLoadingIsOpen(false);
        closeModal();
      },
      validationSchema,
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inner">
          <div className="form-group">
            <input
              placeholder="Name"
              name="name"
              defaultValue={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <span className="error">{errors.name}</span>
            )}
          </div>

          {!loadingIsOpen && (
            <button className="submit-btn" type="submit">
              Login
            </button>
          )}

          {loadingIsOpen && (
            <ReactLoading
              className="Loading"
              type={"spin"}
              color={"black"}
              height={"30px"}
              width={"30px"}
            />
          )}
        </div>
      </form>
    </>
  );
}
