import { ErrorMessage } from "@hookform/error-message";
import { FiCheck } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Listbox } from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react";

type option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  name: string;
  placeholder?: string;
  options: Array<option>;
  showError?: boolean;
  label?: string;
};

const Select = ({
  name,
  options,
  placeholder = "Select",
  showError = true,
  label,
}: SelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <Fragment>
          <label
            htmlFor={name}
            className="mb-1 flex items-center text-sm font-bold"
          >
            {label}
          </label>
          <div className="relative">
            <Listbox
              value={value ?? ""}
              onChange={(value: option) => {
                onChange(value.value);
              }}
            >
              <Listbox.Button
                className={` ${
                  errors[name]
                    ? "border-red-400 text-red-400"
                    : "border-primary-500 text-primary-500 placeholder-primary-500"
                } h-10 w-full pl-3 rounded-lg border bg-transparent  pr-10 text-left text-sm outline-none,
              `}
              >
                {options.find((option) => option.value === value)?.label ??
                  placeholder}
              </Listbox.Button>
              <Listbox.Options className="absolute top-10 z-10 mt-2 w-full rounded-[4px] bg-primary-950 py-2 shadow-xl">
                {options.map((option) => (
                  <Listbox.Option
                    className={`relative cursor-pointer text-sm py-2 pl-8 font-semibold text-primary-500 hover:text-white hover:bg-primary-800 ${
                      value === option.value
                        ? " bg-primary-800 text-white "
                        : "hover:bg-opacity-70"
                    }`}
                    key={option.value}
                    value={option}
                    disabled={option.disabled}
                  >
                    {option.label}
                    {value === option.value ? (
                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 ml-2 flex items-center">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                    ) : null}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <div className="pointer-events-none absolute inset-y-0 right-0 mr-2 flex h-10 items-center">
              <IoMdArrowDropdown className="h-5 w-5 text-primary-500" />
            </div>
            {showError ? (
              <div className="h-6 w-full">
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="ml-1 mt-1 text-xs text-red-400">{message}</p>
                  )}
                />
              </div>
            ) : null}
          </div>
        </Fragment>
      )}
    />
  );
};

export default Select;
