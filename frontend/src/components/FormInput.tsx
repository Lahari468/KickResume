import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#212529] mb-1">{label}</label>
      <div className="flex items-center border border-[#CED4DA] rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-[#2F3C7E]">
        {icon && <div className="mr-2">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-sm text-[#212529] placeholder-[#ADB5BD]"
        />
      </div>
      {error && <p className="text-sm text-[#FF6B6B] mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
