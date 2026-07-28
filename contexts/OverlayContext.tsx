import { createContext, useContext, useMemo, useState } from "react";

type OverlayContextValue = {
  headerMenuOpen: boolean;
  setHeaderMenuOpen: (open: boolean) => void;
};

const OverlayContext = createContext<OverlayContextValue | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  const value = useMemo(
    () => ({ headerMenuOpen, setHeaderMenuOpen }),
    [headerMenuOpen]
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay() {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error("useOverlay must be used inside OverlayProvider");
  }

  return context;
}
