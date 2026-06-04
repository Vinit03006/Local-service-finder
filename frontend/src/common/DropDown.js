import { useState } from "react";

function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select",
  bgColor = "#020617",
  textColor = "white",
  borderColor = "#1e293b",
  noBorder = false
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown-selected"
        onClick={() => setOpen(!open)}
        style={{
          background: bgColor,
          color: textColor,
          border: noBorder ? "none" : `1px solid ${borderColor}`
        }}
      >
        {value || placeholder}
      </div>

      {open && (
        <div
          className="dropdown-list"
          style={{
            background: bgColor,
            border: noBorder ? "none" : `1px solid ${borderColor}`
          }}
        >
          {options.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              style={{ color: textColor }}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;