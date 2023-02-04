import Link from "next/link";

interface FooterProps {
  showReportBtn?: boolean;
}

export function Footer({ showReportBtn }: FooterProps) {
  return (
    <footer className="text-gray-500">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-center gap-2 py-12 md:flex-row md:justify-between md:gap-0">
          {showReportBtn && (
            <button className="hidden text-sm md:order-2">Report</button>
          )}
          <ul className="flex gap-4 text-sm md:order-3">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
          <p className="text-sm md:order-1">© 2023 RepeatList</p>
        </div>
      </div>
    </footer>
  );
}
