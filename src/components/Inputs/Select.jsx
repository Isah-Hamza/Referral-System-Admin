import React from "react";
import {RxCaretDown} from "react-icons/rx";

const Select = ({options, className, label, labelClass, placeholder, value, onChange,icon,  disabled = false, ...rest}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <p className={`text-sm font-medium ${labelClass}`}>{label}</p>
      <div className="relative">
        <select
          disabled={disabled}
          className={`${icon && '!pl-10'} focus-within:border-primary-green outline-none w-full border rounded-3xl p-3 pr-4 appearance-none text-sm ${className}`}
          onChange={onChange}
          value={value}
          {...rest}
        >
          <option disabled className="text-text_color" value={""}>{ placeholder || 'Select' }</option>
          {options?.map((item, idx) => (
            <option key={idx} value={item.value ?? item.id}>
              {item.label ?? item.text ?? item.name}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none ">
          <RxCaretDown />
        </span>
        {icon ?<span className='absolute left-3 top-1/2 -translate-y-1/2' >{icon}</span> : null}
      </div>
    </div>
  );
};

export default Select;
