import type { AnyObjectSchema } from "yup";
import type { FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DefaultValues,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit?: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  formMethods?: UseFormReturn<TFormValues>;
  schema?: AnyObjectSchema;
  defaultValues?: DefaultValues<TFormValues>;
};

type FormWithFormMethodsProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit?: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  formMethods: UseFormReturn<TFormValues>;
  schema?: AnyObjectSchema;
  defaultValues?: DefaultValues<TFormValues>;
};

type FormComponentProps<TFormValues extends FieldValues> =
  | FormProps<TFormValues>
  | FormWithFormMethodsProps<TFormValues>;

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  className,
  formMethods,
  useFormProps,
  defaultValues,
  schema,
}: FormComponentProps<TFormValues>): React.ReactElement => {
  const defaultMethods = useForm<TFormValues>({
    ...useFormProps,
    defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });

  const methods = formMethods ?? defaultMethods;

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
