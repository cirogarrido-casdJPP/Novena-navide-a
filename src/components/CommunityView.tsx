import React, { useMemo, useState } from 'react';
import {
  Send,
  Printer,
  Trash2,
  Users,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { CommunityMessage, CustomDayEdit } from '../utils/storage';
import { DIAS_NOVENA } from '../data/novenaTradicional';
import { APP_IMAGES } from '../config/assets';

interface CommunityViewProps {
  messages: CommunityMessage[];
  onAddMessage: (msg: Omit<CommunityMessage, 'id' | 'fechaIso'>) => void;
  onDeleteMessage: (id: string) => void;
  customDayEdits: Record<number, CustomDayEdit>;
  onSelectDay: (dia: number) => void;
}

const VALORES_FILTRO: ('Todos' | CommunityMessage['valor'])[] = [
  'Todos',
  'Amor',
  'Solidaridad',
  'Respeto',
  'Fraternidad',
  'Unión',
];

export const CommunityView: React.FC<CommunityViewProps> = ({
  messages,
  onAddMessage,
  onDeleteMessage,
  customDayEdits,
  onSelectDay,
}) => {
  const [valorFiltro, setValorFiltro] = useState<'Todos' | CommunityMessage['valor']>('Todos');
  const [autor, setAutor] = useState('');
  const [rol, setRol] = useState<CommunityMessage['rol']>('Mamá / Papá');
  const [dia, setDia] = useState<number>(1);
  const [valor, setValor] = useState<CommunityMessage['valor']>('Unión');
  const [mensaje, setMensaje] = useState('');

  const filteredMessages = useMemo(() => {
    if (valorFiltro === 'Todos') return messages;
    return messages.filter((m) => m.valor === valorFiltro);
  }, [messages, valorFiltro]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !mensaje.trim()) return;
    onAddMessage({
      autor: autor.trim(),
      rol,
      dia,
      valor,
      mensaje: mensaje.trim(),
    });
    setMensaje('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Cabecera familiar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-[var(--inst-primary)] font-semibold">
            Participación Familiar · Familia Garrido Rocha
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--inst-ink)] text-balance">
            Muro Familiar de Compromisos y Mensajes Navideños
          </h1>
          <p className="text-base text-[var(--inst-muted)] leading-relaxed max-w-xl">
            Un rincón especial para que padres, hijos, abuelos, tíos y amigos compartan mensajes de unión, solidaridad, respeto, amor y fraternidad, y consulten las dinámicas familiares de los nueve días.
          </p>
          <div className="pt-2 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-surface)] text-xs font-semibold text-[var(--inst-ink)] hover:bg-[var(--inst-surface-alt)] cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Imprimir mural familiar</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden border border-[var(--inst-border)] h-56 lg:h-full">
            <img
              src={APP_IMAGES.arbolComunidad}
              alt="Árbol de Navidad y familia reunida"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Formulario + Muro de mensajes */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-5 bg-[var(--inst-surface)] border border-[var(--inst-border)] rounded-xl p-5 sm:p-6 space-y-4 no-print"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--inst-border)]">
            <HeartHandshake className="w-5 h-5 text-[var(--inst-secondary)]" aria-hidden="true" />
            <h2 className="font-editorial text-xl font-semibold text-[var(--inst-ink)]">
              Escribir mensaje o compromiso
            </h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                Nombre o integrante de la familia
              </label>
              <input
                type="text"
                required
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Ej. Ciro, Mamá, Abuela Rosa o Primos"
                className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)] focus:outline-none focus:border-[var(--inst-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  En familia soy
                </label>
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value as CommunityMessage['rol'])}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)]"
                >
                  <option value="Mamá / Papá">Mamá / Papá</option>
                  <option value="Hijo / Hija">Hijo / Hija</option>
                  <option value="Abuelos / Tíos">Abuelos / Tíos</option>
                  <option value="Familiar / Amigo">Familiar / Amigo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                  Día de la Novena
                </label>
                <select
                  value={dia}
                  onChange={(e) => setDia(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)]"
                >
                  {DIAS_NOVENA.map((d) => (
                    <option key={d.dia} value={d.dia}>
                      Día {d.dia} ({d.fecha})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                Valor navideño
              </label>
              <select
                value={valor}
                onChange={(e) => setValor(e.target.value as CommunityMessage['valor'])}
                className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)]"
              >
                <option value="Unión">Unión</option>
                <option value="Solidaridad">Solidaridad</option>
                <option value="Respeto">Respeto</option>
                <option value="Amor">Amor</option>
                <option value="Fraternidad">Fraternidad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--inst-muted)] mb-1">
                Mensaje o compromiso familiar
              </label>
              <textarea
                rows={4}
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Comparte una bendición, deseo de paz o compromiso para nuestra familia..."
                className="w-full px-3 py-2 rounded-lg border border-[var(--inst-border)] bg-[var(--inst-canvas)] text-sm text-[var(--inst-ink)] focus:outline-none focus:border-[var(--inst-primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
              style={{ backgroundColor: 'var(--inst-primary)' }}
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Publicar en el mural</span>
            </button>
          </div>
        </form>

        {/* Listado de mensajes familiares */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-editorial text-2xl font-semibold text-[var(--inst-ink)]">
              Mensajes de la familia ({filteredMessages.length})
            </h2>

            <div className="flex items-center gap-1 p-1 bg-[var(--inst-surface-alt)] rounded-lg flex-wrap no-print">
              {VALORES_FILTRO.map((val) => {
                const active = valorFiltro === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setValorFiltro(val)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[var(--inst-surface)] text-[var(--inst-ink)] shadow-xs'
                        : 'text-[var(--inst-muted)] hover:text-[var(--inst-ink)]'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] p-8 text-center text-sm text-[var(--inst-muted)]">
              No hay mensajes registrados aún para este valor. ¡Anímate a escribir el primero!
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((m) => (
                <article
                  key={m.id}
                  className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] p-4 sm:p-5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-sm text-[var(--inst-ink)]">
                        {m.autor}
                      </h3>
                      <p className="text-xs text-[var(--inst-muted)]">
                        {m.rol} · Día {m.dia} · Valor: {m.valor}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteMessage(m.id)}
                      className="p-1.5 rounded text-[var(--inst-muted)] hover:text-[var(--inst-secondary)] cursor-pointer no-print"
                      title="Eliminar mensaje"
                      aria-label={`Eliminar mensaje de ${m.autor}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--inst-ink)] leading-relaxed">
                    {m.mensaje}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guía rápida de dinámicas familiares de los 9 días */}
      <section className="space-y-4 pt-4 border-t border-[var(--inst-border)]">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--inst-primary)]" aria-hidden="true" />
          <h2 className="font-editorial text-2xl font-semibold text-[var(--inst-ink)]">
            Guía de dinámicas familiares por día
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DIAS_NOVENA.map((d) => {
            const edit = customDayEdits[d.dia];
            const tituloAct = edit?.actividadTitulo || d.actividadParticipativa.titulo;
            const dinamica = edit?.dinamicaGrupal || d.actividadParticipativa.dinamicaGrupal;
            return (
              <div
                key={d.dia}
                className="rounded-xl border border-[var(--inst-border)] bg-[var(--inst-surface)] p-4 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <p className="text-xs font-mono-tabular text-[var(--inst-muted)]">
                    Día {d.dia} · {d.fecha} · {d.valorDelDia}
                  </p>
                  <h3 className="font-editorial text-lg font-semibold text-[var(--inst-ink)]">
                    {tituloAct}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--inst-muted)] leading-relaxed">
                    {dinamica}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDay(d.dia)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--inst-primary)] hover:underline cursor-pointer self-start no-print"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ir al Día {d.dia}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
