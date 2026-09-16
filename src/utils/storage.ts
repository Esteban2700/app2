import { Extintor, ReporteAccidente, Inspector, Brigadista, Theme } from '../types';

const STORAGE_KEYS = {
  EXTINTORES: 'extintores',
  REPORTES: 'reportes',
  INSPECTORES: 'inspectores',
  BRIGADISTAS: 'brigadistas',
  BRIGADISTA_TURNO: 'brigadistaTurno',
  THEME: 'theme',
};

export const storage = {
  // Extintores
  getExtintores: (): Extintor[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXTINTORES);
    return data ? JSON.parse(data) : [];
  },
  setExtintores: (extintores: Extintor[]): void => {
    localStorage.setItem(STORAGE_KEYS.EXTINTORES, JSON.stringify(extintores));
  },
  addExtintor: (extintor: Extintor): void => {
    const extintores = storage.getExtintores();
    extintores.push(extintor);
    storage.setExtintores(extintores);
  },
  updateExtintor: (extintor: Extintor): void => {
    const extintores = storage.getExtintores();
    const index = extintores.findIndex(e => e.id === extintor.id);
    if (index !== -1) {
      extintores[index] = extintor;
      storage.setExtintores(extintores);
    }
  },
  deleteExtintor: (id: string): void => {
    const extintores = storage.getExtintores().filter(e => e.id !== id);
    storage.setExtintores(extintores);
  },

  // Reportes
  getReportes: (): ReporteAccidente[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REPORTES);
    return data ? JSON.parse(data) : [];
  },
  setReportes: (reportes: ReporteAccidente[]): void => {
    localStorage.setItem(STORAGE_KEYS.REPORTES, JSON.stringify(reportes));
  },
  addReporte: (reporte: ReporteAccidente): void => {
    const reportes = storage.getReportes();
    reportes.push(reporte);
    storage.setReportes(reportes);
  },

  // Inspectores
  getInspectores: (): Inspector[] => {
    const data = localStorage.getItem(STORAGE_KEYS.INSPECTORES);
    if (!data) {
      const defaults: Inspector[] = [
        { id: '1', nombre: 'Carlos Méndez', cargo: 'Supervisor de Seguridad', activo: true, createdAt: new Date().toISOString() },
        { id: '2', nombre: 'Ana López', cargo: 'Inspector de Seguridad', activo: true, createdAt: new Date().toISOString() },
        { id: '3', nombre: 'Roberto García', cargo: 'Jefe de Mantenimiento', activo: true, createdAt: new Date().toISOString() },
      ];
      storage.setInspectores(defaults);
      return defaults;
    }
    return JSON.parse(data);
  },
  setInspectores: (inspectores: Inspector[]): void => {
    localStorage.setItem(STORAGE_KEYS.INSPECTORES, JSON.stringify(inspectores));
  },
  addInspector: (inspector: Inspector): void => {
    const inspectores = storage.getInspectores();
    inspectores.push(inspector);
    storage.setInspectores(inspectores);
  },
  deleteInspector: (id: string): void => {
    const inspectores = storage.getInspectores().filter(i => i.id !== id);
    storage.setInspectores(inspectores);
  },

  // Brigadistas
  getBrigadistas: (): Brigadista[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BRIGADISTAS);
    if (!data) {
      const defaults: Brigadista[] = [
        { id: '1', nombre: 'Miguel Torres', cargo: 'Brigadista', activo: true, createdAt: new Date().toISOString() },
        { id: '2', nombre: 'Laura Martínez', cargo: 'Brigadista', activo: true, createdAt: new Date().toISOString() },
        { id: '3', nombre: 'Pedro Sánchez', cargo: 'Brigadista', activo: true, createdAt: new Date().toISOString() },
      ];
      storage.setBrigadistas(defaults);
      return defaults;
    }
    return JSON.parse(data);
  },
  setBrigadistas: (brigadistas: Brigadista[]): void => {
    localStorage.setItem(STORAGE_KEYS.BRIGADISTAS, JSON.stringify(brigadistas));
  },
  addBrigadista: (brigadista: Brigadista): void => {
    const brigadistas = storage.getBrigadistas();
    brigadistas.push(brigadista);
    storage.setBrigadistas(brigadistas);
  },
  deleteBrigadista: (id: string): void => {
    const brigadistas = storage.getBrigadistas().filter(b => b.id !== id);
    storage.setBrigadistas(brigadistas);
  },

  // Brigadista de turno
  getBrigadistaTurno: (): Brigadista | null => {
    const data = localStorage.getItem(STORAGE_KEYS.BRIGADISTA_TURNO);
    return data ? JSON.parse(data) : null;
  },
  setBrigadistaTurno: (brigadista: Brigadista | null): void => {
    if (brigadista) {
      localStorage.setItem(STORAGE_KEYS.BRIGADISTA_TURNO, JSON.stringify(brigadista));
    } else {
      localStorage.removeItem(STORAGE_KEYS.BRIGADISTA_TURNO);
    }
  },

  // Tema
  getTheme: (): Theme => {
    const data = localStorage.getItem(STORAGE_KEYS.THEME);
    return (data as Theme) || 'auto';
  },
  setTheme: (theme: Theme): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Limpiar todo
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
