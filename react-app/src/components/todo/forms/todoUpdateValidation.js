import * as Yup from 'yup';

const validations = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Please enter at least three letters.')
      .required('Required'),

      status: Yup.boolean()
      .required('Please select status'),
  });

export default validations