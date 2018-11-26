import React from "react";
import classnames from "classnames";

const TextFieldGroup = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
  error
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={classnames(className, {
          "is-invalid": error
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text",
  className: "form-control"
};

export default TextFieldGroup;
