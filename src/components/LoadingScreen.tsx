import { Spinner } from "phosphor-react";

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size={28} className="animate-spin" />
    </div>
  );
}
