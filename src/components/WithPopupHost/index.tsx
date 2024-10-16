import { createContext, useCallback, useContext, useRef } from "react";
import styled from "styled-components";

const popupHostContext = createContext<() => HTMLDivElement | null>(() => null);

export function usePopupHostPortal() {
  return useContext(popupHostContext)();
}

export function WithPopupHost({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const portalContainerGetter = useCallback(() => modalRef.current, []);
  return (
    <PopupHostWrapper>
      <popupHostContext.Provider value={portalContainerGetter}>
        {children}
      </popupHostContext.Provider>
      <PopupHost ref={modalRef} />
    </PopupHostWrapper>
  );
}

const PopupHostWrapper = styled.div`
  display: contents;
`;

const PopupHost = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
