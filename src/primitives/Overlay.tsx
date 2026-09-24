import type { ReactNode } from "react";
import styles from "./Overlay.module.css";

type OverlayProps = {
  open: boolean;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
};

export function Overlay({ open, onClose, className, children }: OverlayProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={[styles.panel, className].filter(Boolean).join(" ")}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
