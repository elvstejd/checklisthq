import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SpanInputProps {
  placeholder: string;
  className: string;
  uniqueClass: string;
}

export function SpanInput({
  placeholder,
  className,
  uniqueClass,
}: SpanInputProps) {
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
          "w-fit cursor-text rounded-md bg-gray-100 px-2 py-1 empty:before:text-gray-400 focus-visible:bg-white",
          uniqueClass,
          {
            "bg-white hover:bg-gray-100": value,
          }
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
          __html: `.${uniqueClass}:empty::before { content: "${placeholder}"}`,
        }}
      ></style>
    </>
  );
}
