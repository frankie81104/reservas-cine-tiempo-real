
const { EventEmitter } = require('events');

const eventos = new EventEmitter();

const base = (a) => ({ funcionId: a.funcionId, asientoId: a.id, fila: a.fila, numero: a.numero, version: a.version });

eventos.mensajes = {
  bloqueado: (a) => ({ tipo: 'asiento_bloqueado', ...base(a), bloqueadoHasta: a.bloqueadoHasta }),
  liberado: (a, motivo) => ({ tipo: 'asiento_liberado', ...base(a), motivo }), // 'liberado_por_usuario' | 'bloqueo_vencido'
  vendido: (a) => ({ tipo: 'asiento_vendido', ...base(a) }),
};

eventos.publicar = (mensaje) => eventos.emit('cambio', mensaje);

module.exports = eventos;
