import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-gray-500">
      <div className="mx-auto max-w-6xl py-4">
        <div className="flex justify-between py-12">
          <p className="text-sm">© 2023 RepeatList</p>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
