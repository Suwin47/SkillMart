function ConfirmModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          ⚠️
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-4 text-center text-slate-500">
          {message}
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border py-3 font-semibold hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;