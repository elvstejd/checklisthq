import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SpanInputProps {
  placeholder: string;
  className: string;
}

export function SpanInput({ placeholder, className }: SpanInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <span
        ref={inputRef}
        className={clsx(
          className,
          "w-fit rounded-md px-2 py-1 empty:before:text-gray-400 hover:bg-gray-100",
          "span-input"
        )}
        role="textbox"
        onClick={() => {
          if (inputRef.current) {
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          }
        }}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setValue(e.currentTarget.textContent as string)}
      ></span>
      <style
        dangerouslySetInnerHTML={{
          __html: `.span-input:empty::before { content: "${placeholder}"}`,
        }}
      ></style>
    </>
  );
}
