import { createContext, useCallback, useContext, useRef } from "react";

const popupHostContext = createContext<() => HTMLDivElement | null>(() => null);

export function usePopupHostPortal() {
  return useContext(popupHostContext)();
}

export function WithPopupHost({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const portalContainerGetter = useCallback(() => modalRef.current, []);
  return (
    <div style={{ position: "relative" }}>
      <popupHostContext.Provider value={portalContainerGetter}>
        {children}
      </popupHostContext.Provider>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        ref={modalRef}
      ></div>
    </div>
  );
}
