import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
};

const Modal = ({
  children,
  open,
  onClose,
  initialFocus,
}: ModalProps): React.ReactElement => (
  <Transition appear show={open} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-10"
      onClose={onClose}
      initialFocus={initialFocus}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-60" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-max transform overflow-hidden border border-primary-500 rounded-2xl bg-bg p-4 text-left align-middle shadow-xl transition-all">
              {children}
              <div>
                <button
                  onClick={onClose}
                  className="w-full bg-red-400 py-2 rounded-lg hover:bg-red-500"
                >
                  Cancelar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default Modal;
