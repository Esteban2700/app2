export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateCodigo = (count: number): string => {
  const num = count + 1;
  return `EXT-${String(num).padStart(3, '0')}`;
};

export const getDaysUntilExpiry = (fechaVencimiento: string): number => {
  const today = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diffTime = vencimiento.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateVencimiento = (fechaRecarga: string): string => {
  const recarga = new Date(fechaRecarga);
  recarga.setFullYear(recarga.getFullYear() + 1);
  return recarga.toISOString().split('T')[0];
};

export const getEstadoFromFechas = (fechaVencimiento: string): 'activo' | 'mantenimiento' | 'vencido' => {
  const days = getDaysUntilExpiry(fechaVencimiento);
  if (days < 0) return 'vencido';
  if (days <= 30) return 'mantenimiento';
  return 'activo';
};

export const formatFecha = (fecha: string): string => {
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatFechaCorta = (fecha: string): string => {
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const formatHora = (fecha: string): string => {
  const d = new Date(fecha);
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

export const getDiasRestantesTexto = (dias: number): string => {
  if (dias < 0) {
    return `VENCIDO hace ${Math.abs(dias)} días`;
  }
  if (dias === 0) {
    return 'Vence hoy';
  }
  if (dias <= 30) {
    return `Vence en ${dias} días`;
  }
  const meses = Math.floor(dias / 30);
  if (meses >= 12) {
    const anios = Math.floor(meses / 12);
    return `Vigente - ${anios} año${anios > 1 ? 's' : ''}`;
  }
  return `Vigente - ${meses} mes${meses > 1 ? 'es' : ''}`;
};

export const getColorEstado = (estado: 'activo' | 'mantenimiento' | 'vencido'): string => {
  switch (estado) {
    case 'activo': return '#10b981';
    case 'mantenimiento': return '#f59e0b';
    case 'vencido': return '#dc2626';
  }
};

export const getPresionIcon = (presion: 'optima' | 'baja' | 'critica'): string => {
  switch (presion) {
    case 'optima': return '✅';
    case 'baja': return '⚠️';
    case 'critica': return '🔴';
  }
};

export const getTipoExtintorIcon = (tipo: string): string => {
  const icons: Record<string, string> = {
    'PQS': '🧯',
    'CO2': '💨',
    'Agua Presurizada': '💧',
    'Espuma': '🫧',
    'Agente Limpio': '✨',
  };
  return icons[tipo] || '🧯';
};

export const getGravedadIcon = (gravedad: 'leve' | 'moderado' | 'grave'): string => {
  switch (gravedad) {
    case 'leve': return '🟡';
    case 'moderado': return '🟠';
    case 'grave': return '🔴';
  }
};

export const getReporteTipoEmoji = (tipo: string): string => {
  const emojis: Record<string, string> = {
    'Incendio menor': '🔥',
    'Incendio mayor': '🔥',
    'Fuga de gas': '💨',
    'Extintor dañado': '🧯',
    'Falsa alarma': '🚨',
    'Otro': '📝',
  };
  return emojis[tipo] || '📝';
};
