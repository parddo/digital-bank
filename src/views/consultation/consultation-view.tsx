import Layout from "../../components/layout";
import ModalDeleteUser from "../../components/modal-delete-user/modal-delete-user";
import ModalEditUser from "../../components/modal-edit-user";
import { useGetAllUsers } from "../../services/users";
import { format } from "date-fns";

const ConsultationView = () => {
  const { data, isLoading, isError } = useGetAllUsers();

  const users = data?.data ?? [];

  return (
    <Layout>
      <div className="w-full h-20 flex items-center px-4">
        <h2 className="text-3xl font-semibold text-primary-500">Consulta</h2>
      </div>
      <div className="overflow-y-auto">
        <table className="border-2 border-primary-500 min-w-[950px] mx-auto">
          <thead>
            <tr>
              <th className="border-b-2 w-96 border-r py-2 border-primary-500">
                Nombre
              </th>
              <th className="border-b-2 w-60 border-r py-2 border-primary-500">
                Fecha de Nacimiento
              </th>
              <th className="border-b-2 w-40 border-r py-2 border-primary-500">
                Sexo
              </th>
              <th className="border-b-2 w-40 border-r py-2 border-primary-500">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="text-center" key={user._id}>
                <td className="border-b border-primary-500 py-2">
                  {user.name}
                </td>
                <td className="border-b border-primary-500 py-2">
                  {format(new Date(user.date), "dd-MM-yyyy")}
                </td>
                <td className="border-b border-primary-500">{user.gender}</td>
                <td className="border-b border-primary-500 py-2 flex justify-center items-center">
                  <ModalEditUser user={user} />
                  <ModalDeleteUser user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? (
          <div className="animate-pulse w-[950px] mx-auto">
            <div className=" w-full h-12 bg-gray-300 mt-2 dark:bg-gray-700 mb-2 " />
            <div className=" w-full h-12 bg-gray-300 mt-2 dark:bg-gray-700 mb-2 " />
            <div className=" w-full h-12 bg-gray-300 mt-2 dark:bg-gray-700 mb-2 " />
          </div>
        ) : null}
        {isError ? (
          <div className="w-[950px] h-12 mx-auto flex items-center justify-center">
            <p className="text-2xl text-red-400 font-semibold">
              Ocurrio un error
            </p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default ConsultationView;
