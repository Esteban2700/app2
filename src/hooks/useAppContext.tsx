import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Extintor, ReporteAccidente, Inspector, Brigadista, Theme, TabName } from '../types';
import { storage } from '../utils/storage';

interface AppContextType {
  extintores: Extintor[];
  reportes: ReporteAccidente[];
  inspectores: Inspector[];
  brigadistas: Brigadista[];
  brigadistaTurno: Brigadista | null;
  theme: Theme;
  currentTab: TabName;
  setExtintores: (extintores: Extintor[]) => void;
  addExtintor: (extintor: Extintor) => void;
  updateExtintor: (extintor: Extintor) => void;
  deleteExtintor: (id: string) => void;
  addReporte: (reporte: ReporteAccidente) => void;
  addInspector: (inspector: Inspector) => void;
  deleteInspector: (id: string) => void;
  addBrigadista: (brigadista: Brigadista) => void;
  deleteBrigadista: (id: string) => void;
  setBrigadistaTurno: (brigadista: Brigadista | null) => void;
  setTheme: (theme: Theme) => void;
  setCurrentTab: (tab: TabName) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [extintores, setExtintoresState] = useState<Extintor[]>([]);
  const [reportes, setReportes] = useState<ReporteAccidente[]>([]);
  const [inspectores, setInspectoresState] = useState<Inspector[]>([]);
  const [brigadistas, setBrigadistasState] = useState<Brigadista[]>([]);
  const [brigadistaTurno, setBrigadistaTurnoState] = useState<Brigadista | null>(null);
  const [theme, setThemeState] = useState<Theme>('auto');
  const [currentTab, setCurrentTab] = useState<TabName>('inicio');

  useEffect(() => {
    setExtintoresState(storage.getExtintores());
    setReportes(storage.getReportes());
    setInspectoresState(storage.getInspectores());
    setBrigadistasState(storage.getBrigadistas());
    setBrigadistaTurnoState(storage.getBrigadistaTurno());
    setThemeState(storage.getTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = theme === 'dark' || (theme === 'auto' && systemDark);
      root.classList.toggle('dark', isDark);
    };
    applyTheme();
    
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const setExtintores = (extintores: Extintor[]) => {
    setExtintoresState(extintores);
    storage.setExtintores(extintores);
  };

  const addExtintor = (extintor: Extintor) => {
    const nuevos = [...extintores, extintor];
    setExtintores(nuevos);
  };

  const updateExtintor = (extintor: Extintor) => {
    const actualizados = extintores.map(e => e.id === extintor.id ? extintor : e);
    setExtintores(actualizados);
    storage.updateExtintor(extintor);
  };

  const deleteExtintor = (id: string) => {
    const filtrados = extintores.filter(e => e.id !== id);
    setExtintores(filtrados);
    storage.deleteExtintor(id);
  };

  const addReporteLocal = (reporte: ReporteAccidente) => {
    const nuevos = [...reportes, reporte];
    setReportes(nuevos);
    storage.addReporte(reporte);
  };

  const addInspector = (inspector: Inspector) => {
    const nuevos = [...inspectores, inspector];
    setInspectoresState(nuevos);
    storage.addInspector(inspector);
  };

  const deleteInspector = (id: string) => {
    const filtrados = inspectores.filter(i => i.id !== id);
    setInspectoresState(filtrados);
    storage.deleteInspector(id);
  };

  const addBrigadista = (brigadista: Brigadista) => {
    const nuevos = [...brigadistas, brigadista];
    setBrigadistasState(nuevos);
    storage.addBrigadista(brigadista);
  };

  const deleteBrigadista = (id: string) => {
    const filtrados = brigadistas.filter(b => b.id !== id);
    setBrigadistasState(filtrados);
    storage.deleteBrigadista(id);
  };

  const setBrigadistaTurno = (brigadista: Brigadista | null) => {
    setBrigadistaTurnoState(brigadista);
    storage.setBrigadistaTurno(brigadista);
  };

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    storage.setTheme(theme);
  };

  return (
    <AppContext.Provider value={{
      extintores,
      reportes,
      inspectores,
      brigadistas,
      brigadistaTurno,
      theme,
      currentTab,
      setExtintores,
      addExtintor,
      updateExtintor,
      deleteExtintor,
      addReporte: addReporteLocal,
      addInspector,
      deleteInspector,
      addBrigadista,
      deleteBrigadista,
      setBrigadistaTurno,
      setTheme,
      setCurrentTab,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
