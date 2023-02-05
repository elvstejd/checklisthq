import clsx from "clsx";
import { CheckCircle, Info, WarningOctagon, X } from "phosphor-react";
import { toast } from "react-hot-toast";

interface ShowToastProps {
  message: string;
  type: "error" | "success" | "info";
}

function showToash({ message, type }: ShowToastProps) {
  toast.custom(
    (t) => (
      <div
        className={clsx(
          "flex w-full max-w-md items-center justify-between rounded-lg border bg-white p-4 shadow-lg",
          {
            "animate-leave": !t.visible,
            "animate-enter": t.visible,
          }
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={clsx(
              "flex aspect-square items-center justify-center rounded-full"
            )}
          >
            {type === "success" && (
              <CheckCircle className="text-green-400" size={28} weight="fill" />
            )}
            {type === "error" && (
              <WarningOctagon
                className="text-red-400"
                size={28}
                weight="fill"
              />
            )}
            {type === "info" && (
              <Info className="text-blue-400" size={28} weight="fill" />
            )}
          </div>
          <p className="text-gray-800">{message}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="transition-color group rounded-lg p-2"
        >
          <X
            size={18}
            weight="bold"
            className="text-gray-600 group-hover:text-gray-800"
          />
        </button>
      </div>
    ),
    { position: "bottom-center" }
  );
}

export const notify = {
  error: (message: string) => showToash({ message, type: "error" }),
  success: (message: string) => showToash({ message, type: "success" }),
  info: (message: string) => showToash({ message, type: "info" }),
};
