import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

interface SpanInputProps {
  placeholder: string;
  className: string;
  uniqueClass: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  error?: string;
}

export function SpanInput({
  placeholder,
  className,
  uniqueClass,
  onChange,
  autoFocus,
  error,
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
          "inline-block w-fit cursor-text rounded-md border border-transparent px-2 py-1 empty:before:text-gray-400 hover:border-gray-400 focus-visible:bg-white",
          uniqueClass,
          {
            "border-red-500 bg-red-50 outline-none hover:border-red-500 focus-visible:bg-red-50":
              error,
          }
        )}
        role="textbox"
        onPaste={(event: React.ClipboardEvent) => {
          const text = (event.clipboardData || event.clipboardData).getData(
            "text"
          );
          event.preventDefault();
          document.execCommand("insertText", false, text);
        }}
        onDrop={(event) => {
          const text = event.dataTransfer.getData("text");
          event.preventDefault();

          if (inputRef.current) {
            inputRef.current.textContent += text;
            if (inputRef.current.textContent)
              setValue(inputRef.current.textContent);
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
