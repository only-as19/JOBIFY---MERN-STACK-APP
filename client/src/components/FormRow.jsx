const FormRow = ({ name, type, labelText, defaultValue, onChange }) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default FormRow;
