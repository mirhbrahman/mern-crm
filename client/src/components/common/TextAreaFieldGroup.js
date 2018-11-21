import React from "react";
import classnames from "classnames";

const TextAreaFieldGroup = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextAreaFieldGroup;
