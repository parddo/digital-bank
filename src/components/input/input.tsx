import { ErrorMessage } from "@hookform/error-message";
import { FaCalendarAlt } from "react-icons/fa";
import {
  RegisterOptions,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

type BaseInputProps = {
  name: string;
  label?: React.ReactNode;
  type?: "text" | "date";
  srLabel?: boolean;
  placeholder?: string;
  autoComplete?: string;
  showError?: boolean;
  leadingIcon?: React.FC<{ className: string }>;
};

type InputProps = {
  defaultValue?: string;
  rules?: RegisterOptions | ((formContext: UseFormReturn) => RegisterOptions);
  value?: never;
  disabled?: boolean;
  onChange?: never;
} & BaseInputProps;

type ControlledInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: never;
} & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "autoComplete" | "type" | "id" | "placeHolder" | "name"
> &
  BaseInputProps;

const Input = ({
  defaultValue,
  autoComplete,
  name,
  label,
  placeholder,
  disabled,
  rules,
  type = "text",
  showError = true,
  srLabel = false,
  value,
  onChange,
  leadingIcon: LeadingIcon,
  ...controlledInputProps
}: InputProps | ControlledInputProps): React.ReactElement => {
  const context = useFormContext();
  const {
    register,
    formState: { errors },
  } = context;
  const isError = errors[name] ? true : false;

  const isControlled = value !== undefined;
  const inputProps = isControlled
    ? {
        name,
        value,
        onChange,
        ...controlledInputProps,
      }
    : register(name, typeof rules === "function" ? rules(context) : rules);

  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className={
            srLabel ? "sr-only" : "mb-1 flex items-center text-sm font-bold"
          }
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {type === "date" ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 mr-2 flex h-10 items-center">
            <FaCalendarAlt className="text-primary-500" />
          </div>
        ) : null}
        <input
          type={type}
          disabled={disabled}
          className={` ${
            isError
              ? "border-red-400 text-red-400 placeholder-red-400"
              : "border-primary-500 text-primary-500 placeholder-primary-800"
          } h-10 pl-3 w-full rounded-lg border  bg-transparent text-sm outline-none focus:border-2`}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={isError}
          defaultValue={defaultValue}
          {...inputProps}
        />
        {type === "date" && LeadingIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <LeadingIcon className="text-gray-400" />
          </div>
        )}
        {showError ? (
          <div className="h-[24px] w-full pb-1">
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="ml-1 mt-1 truncate text-xs text-red-400">
                  {message}
                </p>
              )}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
