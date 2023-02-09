import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Button from "./Button";
import { Info, Skull, Warning } from "phosphor-react";

interface DialogModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  title: string;
  description: string;
  type?: "default" | "danger" | "warning";
  target?: JSX.Element;
}

export function DialogModal({
  title,
  description,
  type,
  target,
  onConfirm,
  onCancel,
}: DialogModalProps) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <div onClickCapture={() => setOpen(true)}>{target}</div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div>
                  <div
                    className={clsx(
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
                      {
                        "bg-blue-100": type === "default" || !type,
                        "bg-red-100": type === "danger",
                        "bg-yellow-100": type === "warning",
                      }
                    )}
                  >
                    {type === "danger" && (
                      <Skull
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                        weight="fill"
                      />
                    )}
                    {type === "warning" && (
                      <Warning
                        className="h-6 w-6 text-yellow-600"
                        aria-hidden="true"
                        weight="fill"
                      />
                    )}
                    {(type === "default" || !type) && (
                      <Info
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                        weight="fill"
                      />
                    )}
                  </div>

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="mx-auto mb-3 max-w-xs text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onCancel?.();
                    }}
                    innerRef={cancelButtonRef}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    color={type}
                    onClick={() => {
                      setOpen(false);
                      onConfirm?.();
                    }}
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
