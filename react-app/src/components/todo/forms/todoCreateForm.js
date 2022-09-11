import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./todoCreateValidation";

import { useDispatch } from "react-redux";
import { addTodo } from "../../../redux/todo/todoSlice";
import ReactLoading from "react-loading";

export default function TodoCreateForm() {
  const dispatch = useDispatch();
  const [loadingIsOpen, setLoadingIsOpen] = React.useState(false);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
      },
      onSubmit: async (values) => {
        setLoadingIsOpen(true);
        await dispatch(addTodo(values));
        setLoadingIsOpen(false);
      },
      validationSchema,
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inner">
          <div className="form-group">
            <input
              placeholder="title..."
              name="title"
              defaultValue={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <span className="error">{errors.title}</span>
            )}
          </div>

          {!loadingIsOpen && (
            <button className="submit-btn" type="submit">
              Create
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
