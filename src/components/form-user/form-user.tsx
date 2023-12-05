import { date, object, string } from "yup";
import Form from "../form";
import Input from "../input/input";
import Select from "../select";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "../../services/users";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = object().shape({
  name: string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  date: date()
    .typeError("Fecha no valida")
    .required("La fecha de nacimiento es requerida")
    .max(new Date(), "La fecha de nacimiento no valida"),
  gender: string()
    .required("El género es requerido")
    .oneOf(
      ["Femenino", "Masculino", "Otro"],
      "El género debe ser Femenino, Masculino u Otro"
    ),
});

type FormData = {
  name: string;
  date: Date;
  gender: string;
};

type FormUserProps = {
  id?: string;
  action: "edit" | "create";
  defaultValues?: FormData;
  onClose?: () => void;
};

const FormUser = ({ defaultValues, action, id, onClose }: FormUserProps) => {
  const { mutateAsync, isLoading } = useCreateUser();
  const { mutateAsync: muntateUpadate, isLoading: isLoadingUpdate } =
    useUpdateUser(id ?? "");
  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  const { reset } = methods;

  const handleSubmit = (data: FormData) => {
    if (action === "create") {
      const createUser = mutateAsync(data).then(() => {
        reset();
      });
      void toast.promise(createUser, {
        loading: "Crando usuario...",
        success: "Usuario creado exitosamente",
        error: "Error, por favor intente nuevamente",
      });
    } else {
      const updateUser = muntateUpadate(data).then(onClose ?? null);
      void toast.promise(updateUser, {
        loading: "Actualizando usuario...",
        success: "Usuario actualizado exitosamente",
        error: "Error, por favor intente nuevamente",
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      formMethods={methods}
      className="max-w-[500px]"
    >
      <div className="mb-2">
        <Input
          name="name"
          type="text"
          label="Nombre completo"
          placeholder="Ingrese su nombre"
        />
      </div>
      <div className="mb-2">
        <Input name="date" type="date" label="Fecha de nacimiento" />
      </div>
      <div>
        <Select
          label="Sexo"
          placeholder="Sexo"
          name="gender"
          options={[
            {
              label: "Femenino",
              value: "Femenino",
            },
            {
              label: "Masculino",
              value: "Masculino",
            },
            {
              label: "Otro",
              value: "Otro",
            },
          ]}
        />
      </div>
      <div className="mt-4 mb-4">
        <button
          type="submit"
          className="w-full bg-primary-500 py-2 rounded-lg hover:bg-primary-800"
          disabled={isLoading || isLoadingUpdate}
        >
          { action === "create" ? "Agregar" : "Editar"}
        </button>
      </div>
    </Form>
  );
};

export default FormUser;
