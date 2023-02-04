import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SpanInputProps {
  placeholder: string;
  className: string;
  uniqueClass: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function SpanInput({
  placeholder,
  className,
  uniqueClass,
  onChange,
  autoFocus,
}: SpanInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <>
      <span
        ref={inputRef}
        className={clsx(
          className,
          "w-fit cursor-text rounded-md border border-transparent px-2 py-1 empty:before:text-gray-400 hover:border-gray-400 focus-visible:bg-white",
          uniqueClass
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
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `.${uniqueClass}:empty::before { content: "${placeholder}"}`,
        }}
      ></style>
    </>
  );
}
