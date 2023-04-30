import { useEffect, useRef } from "react";

export const Loading = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, []);

  return <dialog ref={dialogRef}>Loading...</dialog>;
};
