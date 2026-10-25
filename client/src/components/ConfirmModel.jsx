
import { CircleAlert, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to continue with this action?",
  onCancel,
  onConfirm,
  confirmText = "Confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-[#fafbf9] p-6 shadow-2xl">

        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8ece3]">
            <CircleAlert size={25} className="text-[#68755f]" />
          </div>

          <button
            onClick={onCancel}
            className="rounded-full p-2 text-[#777d76] hover:bg-[#e5e7e1]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="font-serif text-xl font-semibold text-[#20251f]">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#777d76]">
          {message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#e5e7e1] px-4 py-3 text-sm font-medium text-[#20251f] hover:bg-[#f0f2ed]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-[#68755f] px-4 py-3 text-sm font-medium text-white hover:bg-[#56634e]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
