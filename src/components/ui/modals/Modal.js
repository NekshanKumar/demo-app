export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 transition">
      <div className="relative bg-white rounded-2xl shadow-2xl px-7 py-7 max-w-xl w-[95vw] md:w-[680px] min-w-[320px]">
        <button
          className="absolute top-5 right-6 text-3xl px-2 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
