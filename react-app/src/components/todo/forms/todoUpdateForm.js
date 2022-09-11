import React, {useState} from "react";
import { useFormik } from "formik";
import validationSchema from "./todoUpdateValidation";

import { useDispatch } from "react-redux";
import { updateTodo } from "../../../redux/todo/todoSlice";
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';

export default function TodoUpdateForm(props) {
  const dispatch = useDispatch();
  const [loadingIsShowing, setLoadingIsShowing] = React.useState(false);

  const todoItem = props.todoItem;

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        id: todoItem.id,
        title: todoItem.title,
        status: todoItem.status == true || todoItem.status === 'true',
      },
      onSubmit: async (values) => {
        values.status = values.status == true || values.status === 'true';

        setLoadingIsShowing(true);
        console.log(values)
        await dispatch(updateTodo(values));
        setLoadingIsShowing(false);
        toast('Update successful.');
      },
      validationSchema,
    });

  return (
    <>
        <div className="inner">
          <div className="title">
               <h1>Update Todo</h1>
          </div>

          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <select name="status" 
              defaultValue={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              >
                <option value={true} >
                  Completed
                </option>
                <option value={false} >
                  Not Completed
                </option>
              </select>
              {errors.title && touched.status && (
                <span className="error">{errors.status}</span>
              )}
            </div>

            <button className="submit-btn" type="submit">
              Update
            </button>
         
            {
              loadingIsShowing &&
              <ReactLoading className="Loading" type={"spin"} color={"black"} height={'30px'} width={'30px'} />
            }
          </form>

        </div>
        <Toaster />
    </>
  );
}
