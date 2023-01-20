interface ButtonProps {
  children: string;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="mr-2 mb-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800">
      {children}
    </button>
  );
}
