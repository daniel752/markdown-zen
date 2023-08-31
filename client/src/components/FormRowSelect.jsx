/* eslint-disable react/prop-types */

const FormRowSelect = ({
  name,
  labelText,
  list,
  onChange,
  isDisabled = false,
  defaultValue,
}) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <select
        className="form-select"
        id={name}
        name={name}
        onChange={onChange}
        disabled={isDisabled}
        defaultValue={defaultValue}
      >
        {list.map(item => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
