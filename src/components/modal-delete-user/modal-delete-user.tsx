import { Fragment, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ExtendedUserAttr, useDeleteUser } from "../../services/users";
import toast from "react-hot-toast";
import Modal from "../modal";

type ModalDeleteUserProps = {
  user: ExtendedUserAttr;
};

const ModalDeleteUser = ({ user }: ModalDeleteUserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync, isLoading } = useDeleteUser();

  const handleDelete = () => {
    const deleteUser = mutateAsync(user._id).then(() => setOpen(false));
    void toast.promise(deleteUser, {
      loading: "Eliminando usuario...",
      success: "Usuario eliminado exitosamente",
      error: "Error, por favor intente nuevamente",
    });
  };

  return (
    <Fragment>
      <button
        className="bg-red-400 hover:bg-red-500 w-8 h-8 rounded-full flex justify-center items-center"
        onClick={() => setOpen(true)}
      >
        <MdDelete className="text-sm" />
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <div>
          <h2 className="full text-center text-3xl mb-8 mt-4 font-medium">
            Eliminar usuario
          </h2>
          <div className="text-center">
            <p className="text-xl font-semibold">
              Esta seguro que desea el registro de:
            </p>
            <h4 className="text-3xl font-bold">{user.name}?</h4>
            <div className="py-10 flex justify-center">
              <MdDelete className="text-7xl text-red-400" />
            </div>
          </div>
          <div className="mb-6">
            <button
              disabled={isLoading}
              onClick={handleDelete}
              className="w-full bg-primary-500 py-2 rounded-lg hover:bg-primary-800"
            >
              {isLoading ? "Eliminando.." : "Sí, Eliminar"}
            </button>
          </div>
        </div>

        <div className="w-96"></div>
      </Modal>
    </Fragment>
  );
};

export default ModalDeleteUser;
