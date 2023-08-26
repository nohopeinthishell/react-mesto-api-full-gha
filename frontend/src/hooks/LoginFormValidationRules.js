export default function validate(values) {
  console.log(values)
  let errors = {};
  if (!values.name) {
    errors.name = 'Вы пропустили это поле';
  } else if (values.name.length < 3) {
    errors.name = 'Минимальное количество символов: 2.';
  }
  if (!values.link) {
    errors.link = 'Вы пропустили это поле';
  } else if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~H?&/=]*)$/.test(values.link)) {
    errors.link = 'Введите корректный адрес сайта';
  }
  return errors;
};
