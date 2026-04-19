"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type WorkspaceThemePreference = "dark" | "light" | "system";
type WorkspaceEffectiveTheme = "dark" | "light";

type WorkspaceThemeContextValue = {
  preference: WorkspaceThemePreference;
  effectiveTheme: WorkspaceEffectiveTheme;
  systemTheme: WorkspaceEffectiveTheme;
  setPreference: (next: WorkspaceThemePreference) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "choncc-workspace-theme";

const WorkspaceThemeContext = createContext<WorkspaceThemeContextValue | null>(null);

function detectSystemTheme(): WorkspaceEffectiveTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function WorkspaceThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<WorkspaceThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<WorkspaceEffectiveTheme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedPreference = window.localStorage.getItem(STORAGE_KEY) as WorkspaceThemePreference | null;
    if (savedPreference === "dark" || savedPreference === "light" || savedPreference === "system") {
      setPreferenceState(savedPreference);
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystem = () => {
      setSystemTheme(media.matches ? "dark" : "light");
    };

    applySystem();
    media.addEventListener("change", applySystem);

    return () => media.removeEventListener("change", applySystem);
  }, []);

  const setPreference = useCallback((next: WorkspaceThemePreference) => {
    setPreferenceState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const effectiveTheme: WorkspaceEffectiveTheme =
    preference === "system" ? systemTheme : preference;

  const toggleTheme = useCallback(() => {
    setPreference(effectiveTheme === "dark" ? "light" : "dark");
  }, [effectiveTheme, setPreference]);

  const value = useMemo(
    () => ({
      preference,
      effectiveTheme,
      systemTheme,
      setPreference,
      toggleTheme,
    }),
    [preference, effectiveTheme, systemTheme, setPreference, toggleTheme]
  );

  return (
    <WorkspaceThemeContext.Provider value={value}>
      <div
        className={`workspace-theme-root h-full ${effectiveTheme === "dark" ? "dark" : ""}`}
        data-theme={effectiveTheme}
      >
        {children}
      </div>
    </WorkspaceThemeContext.Provider>
  );
}

export function useWorkspaceTheme() {
  const context = useContext(WorkspaceThemeContext);
  if (!context) {
    throw new Error("useWorkspaceTheme must be used within WorkspaceThemeProvider");
  }

  return context;
}
