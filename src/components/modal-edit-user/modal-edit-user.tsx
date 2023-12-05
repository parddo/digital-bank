import { Fragment, useState } from "react";
import FormUser from "../form-user/form-user";
import { RiEdit2Fill } from "react-icons/ri";
import { ExtendedUserAttr } from "../../services/users";
import Modal from "../modal";

type ModalEditUserProps = {
  user: ExtendedUserAttr;
};

const ModalEditUser = ({ user }: ModalEditUserProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <button
        className="bg-primary-500 hover:bg-primary-700 w-8 h-8 rounded-full flex justify-center items-center mr-4"
        onClick={() => setOpen(true)}
      >
        <RiEdit2Fill className="text-sm" />
      </button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <div>
          <h2 className="full text-center text-3xl mb-8 mt-4 font-medium">
            Editar usuario
          </h2>
        </div>
        <div className="w-96 max-w-full">
          <FormUser
            onClose={() => setOpen(false)}
            id={user._id}
            action="edit"
            defaultValues={{
              date: user.date,
              name: user.name,
              gender: user.gender,
            }}
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalEditUser;
