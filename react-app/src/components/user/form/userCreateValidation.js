import * as Yup from 'yup';

const validations = Yup.object().shape({
    name: Yup.string()
      .required('Required'),
  });

export default validations