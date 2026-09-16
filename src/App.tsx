import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Shield, FileText, Settings, Plus, X, Search, QrCode, Camera, Check, AlertTriangle, XCircle, Trash2, Edit2, Printer, Moon, Sun, Monitor, User } from 'lucide-react';
import { AppProvider, useAppContext } from './hooks/useAppContext';
import { Extintor, Brigadista } from './types';
import { storage } from './utils/storage';
import { generateId, generateCodigo, getDaysUntilExpiry, calculateVencimiento, getEstadoFromFechas, formatFecha, formatFechaCorta, getDiasRestantesTexto, getColorEstado, getPresionIcon, getTipoExtintorIcon, getGravedadIcon, getReporteTipoEmoji } from './utils/helpers';

type TabName = 'inicio' | 'extintores' | 'reportes' | 'ajustes';
const headerColors: Record<TabName, string> = { inicio: 'from-emerald-500 to-teal-600', extintores: 'from-red-500 to-rose-600', reportes: 'from-orange-500 to-amber-600', ajustes: 'from-slate-500 to-gray-600' };

const AppContent: React.FC = () => {
  const { extintores, addExtintor, updateExtintor, deleteExtintor, reportes, addReporte, inspectores, addInspector, deleteInspector, brigadistas, addBrigadista, deleteBrigadista, brigadistaTurno, setBrigadistaTurno, theme, setTheme, currentTab, setCurrentTab } = useAppContext();
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedExtintor, setSelectedExtintor] = useState<Extintor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEstado, setFilterEstado] = useState<'todos' | 'activos' | 'vencer' | 'vencidos' | 'mantenimiento'>('todos');
  const [fabOpen, setFabOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [editingExtintor, setEditingExtintor] = useState<Extintor | null>(null);
  const [printSelection, setPrintSelection] = useState<Set<string>>(new Set());

  const activosCount = extintores.filter(e => e.estado === 'activo').length;
  const mantenimientoCount = extintores.filter(e => e.estado === 'mantenimiento').length;
  const vencidosCount = extintores.filter(e => e.estado === 'vencido').length;
  const totalExtintores = extintores.length;
  const porcentajeActivos = totalExtintores > 0 ? Math.round((activosCount / totalExtintores) * 100) : 0;

  const filteredExtintores = extintores.filter(e => {
    const matchesSearch = e.codigo.toLowerCase().includes(searchQuery.toLowerCase()) || e.ubicacion.toLowerCase().includes(searchQuery.toLowerCase());
    const daysUntil = getDaysUntilExpiry(e.fechaVencimiento);
    let matchesFilter = true;
    if (filterEstado === 'activos') matchesFilter = e.estado === 'activo';
    else if (filterEstado === 'vencer') matchesFilter = daysUntil <= 30 && daysUntil >= 0;
    else if (filterEstado === 'vencidos') matchesFilter = e.estado === 'vencido';
    else if (filterEstado === 'mantenimiento') matchesFilter = e.estado === 'mantenimiento';
    return matchesSearch && matchesFilter;
  });

  const getNextCodigo = () => generateCodigo(extintores.length);

  const handleCreateExtintor = (data: any) => {
    const nuevo: Extintor = { id: generateId(), codigo: data.codigo || getNextCodigo(), ubicacion: data.ubicacion, tipo: data.tipo, capacidad: data.capacidad, fechaRecarga: data.fechaRecarga, fechaVencimiento: data.fechaVencimiento || calculateVencimiento(data.fechaRecarga), presion: data.presion, estado: getEstadoFromFechas(data.fechaVencimiento || calculateVencimiento(data.fechaRecarga)), notas: data.notas || '', inspecciones: [], createdAt: new Date().toISOString() };
    addExtintor(nuevo);
    setShowModal(null);
  };

  const handleUpdateExtintor = (data: any) => {
    if (!editingExtintor) return;
    const actualizado: Extintor = { ...editingExtintor, codigo: data.codigo, ubicacion: data.ubicacion, tipo: data.tipo, capacidad: data.capacidad, fechaRecarga: data.fechaRecarga, fechaVencimiento: data.fechaVencimiento, presion: data.presion, estado: getEstadoFromFechas(data.fechaVencimiento), notas: data.notas };
    updateExtintor(actualizado);
    setEditingExtintor(null);
    setShowModal(null);
  };

  const handleAddInspection = (extintorId: string, inspection: any) => {
    const extintor = extintores.find(e => e.id === extintorId);
    if (!extintor) return;
    const nuevaInspeccion = { id: generateId(), extintorId, fecha: `${inspection.fecha}T${inspection.hora}`, inspector: inspection.inspector, estado: inspection.estado, presion: inspection.presion, observaciones: inspection.observaciones };
    let updatedExtintor = { ...extintor, inspecciones: [...extintor.inspecciones, nuevaInspeccion], presion: inspection.presion };
    if (inspection.renovarVencimiento && inspection.nuevaFechaVencimiento) {
      updatedExtintor = { ...updatedExtintor, fechaVencimiento: inspection.nuevaFechaVencimiento, fechaRecarga: inspection.fecha, estado: getEstadoFromFechas(inspection.nuevaFechaVencimiento) };
    }
    updateExtintor(updatedExtintor);
    setShowModal(null);
    setSelectedExtintor(null);
  };

  const handleAddReporte = (data: any) => {
    const nuevo = { id: generateId(), fecha: `${data.fecha}T${data.hora}`, ubicacion: data.ubicacion, descripcion: data.descripcion, tipo: data.tipo, gravedad: data.gravedad, reportadoPor: data.reportadoPor || brigadistaTurno?.nombre || '', createdAt: new Date().toISOString() };
    addReporte(nuevo);
    setShowModal(null);
  };

  return <div className="min-h-screen bg-gray-100 dark:bg-gray-900">SHE Natura App</div>;
};

const App: React.FC = () => { return (<AppProvider><AppContent /></AppProvider>); };
export default App;
