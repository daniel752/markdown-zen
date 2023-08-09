/* eslint-disable react/prop-types */

const FormRowSelect = ({ name, labelText, list, onChange }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <select className="form-select" id={name} name={name} onChange={onChange}>
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
