"use client";
import React, { ReactNode, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
type props = {
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
};

const Modal = ({ onClose, children, title, className }: props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const modalWrapperRef = React.useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback((e: MouseEvent) => {
    if (!modalWrapperRef?.current?.contains(e.target as Node)) {
      onClose && onClose();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
    return () => window.removeEventListener("click", backDropHandler);
  }, []);

  const handleCloseClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClose && onClose();
  };

  const modalContent = (
    <>
      <button
        onClick={handleCloseClick}
        className="fixed w-full h-full top-0 left-0 bg-white/60 z-50 backdrop-blur-lg"
      />
      <div ref={modalWrapperRef} className={`fixed  z-[60] ${className}`}>
        <div className="modal">
          {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );

  return mounted
    ? ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
      )
    : null;
};

export default Modal;
