"use client";

import { createContext, ReactNode, useContext } from "react";

export interface OnboardingFlow {
  foo: string;
}

const GlobalContext = createContext<OnboardingFlow>(null!);

export const GlobalProvider = ({
  flow,
  children,
}: {
  flow: OnboardingFlow;
  children: ReactNode;
}) => {
  return (
    <GlobalContext.Provider value={flow}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
