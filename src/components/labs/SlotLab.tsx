import { useState } from 'react';
import { LabFrame } from './LabFrame';

const DAY_START = 6 * 60;
const DAY_END = 22 * 60;
const STEP = 30;
const SLOTS = (DAY_END - DAY_START) / STEP;

type Status = 'Blocked' | 'Confirmed' | 'Pending';

interface Booking {
  id: number;
  start: number;
  end: number;
  status: Status;
  label: string;
  mine?: boolean;
}

const services = [
  { id: 1, name: 'Maquiagem', minutes: 60 },
  { id: 2, name: 'Penteado', minutes: 90 },
  { id: 3, name: 'Maquiagem + Penteado', minutes: 150 },
];

const initial: Booking[] = [
  { id: 1, start: 6 * 60, end: 14 * 60, status: 'Blocked', label: 'Bloqueio fixo' },
  { id: 2, start: 15 * 60, end: 16 * 60, status: 'Confirmed', label: 'Confirmado' },
  { id: 3, start: 18 * 60, end: 20 * 60 + 30, status: 'Pending', label: 'Em análise' },
];

type Response =
  | { code: 201; start: number; end: number }
  | { code: 409; start: number; end: number; with: Booking }
  | { code: 400; start: number; end: number };

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const pct = (m: number) => ((m - DAY_START) / (DAY_END - DAY_START)) * 100;

const FREE_KM = 5;
const PRICE_PER_KM = 5;

export function SlotLab() {
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [serviceId, setServiceId] = useState(2);
  const [hover, setHover] = useState<number | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const [km, setKm] = useState(12);

  const service = services.find((s) => s.id === serviceId) ?? services[0]!;
  const fee = km <= FREE_KM ? 0 : Math.round((km - FREE_KM) * PRICE_PER_KM * 2 * 100) / 100;

  function book(start: number) {
    const end = start + service.minutes;
    if (end > DAY_END) {
      setResponse({ code: 400, start, end });
      return;
    }
    // mesma condição da constraint: [início, fim) se cruzam
    const clash = bookings.find((b) => start < b.end && end > b.start);
    if (clash) {
      setResponse({ code: 409, start, end, with: clash });
      return;
    }
    setBookings((list) => [...list, { id: Date.now(), start, end, status: 'Pending', label: 'Seu pedido', mine: true }]);
    setResponse({ code: 201, start, end });
  }

  const preview = hover === null ? null : { start: hover, end: hover + service.minutes };

  return (
    <LabFrame
      name="tente marcar um horário"
      note="simulação no navegador com a mesma regra da API · constraint simplificada"
      actions={
        <button
          type="button"
          className="lab__reset mono"
          onClick={() => {
            setBookings(initial);
            setResponse(null);
          }}
        >
          reiniciar
        </button>
      }
    >
      <div className="slot__services" role="radiogroup" aria-label="Serviço">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={s.id === serviceId}
            className={`slot__service${s.id === serviceId ? ' is-active' : ''}`}
            onClick={() => setServiceId(s.id)}
          >
            {s.name}
            <span className="mono">{s.minutes} min</span>
          </button>
        ))}
      </div>

      <div className="slot__scroller">
        <div className="slot__timeline" onMouseLeave={() => setHover(null)}>
          {bookings.map((b) => (
            <div
              key={b.id}
              className={`slot__booking slot__booking--${b.status.toLowerCase()}${b.mine ? ' is-mine' : ''}`}
              style={{ left: `${pct(b.start)}%`, width: `${pct(b.end) - pct(b.start)}%` }}
            >
              <span>{b.label}</span>
            </div>
          ))}

          {preview && (
            <div
              className={`slot__ghost${preview.end > DAY_END ? ' is-bad' : ''}`}
              style={{ left: `${pct(preview.start)}%`, width: `${Math.min(pct(preview.end), 100) - pct(preview.start)}%` }}
            />
          )}

          <div className="slot__cells">
            {Array.from({ length: SLOTS }, (_, i) => {
              const start = DAY_START + i * STEP;
              return (
                <button
                  key={start}
                  type="button"
                  className="slot__cell"
                  aria-label={`Pedir ${service.name} às ${hhmm(start)}`}
                  onMouseEnter={() => setHover(start)}
                  onFocus={() => setHover(start)}
                  onClick={() => book(start)}
                />
              );
            })}
          </div>
        </div>
        <div className="slot__hours mono" aria-hidden="true">
          {[6, 8, 10, 12, 14, 16, 18, 20, 22].map((h) => (
            <span key={h} style={{ left: `${pct(h * 60)}%` }}>
              {h}h
            </span>
          ))}
        </div>
      </div>

      <div className="slot__console mono" aria-live="polite">
        {response ? (
          <>
            <div className="slot__req">
              <span className="slot__verb">POST</span> /api/appointments{' '}
              <span className="slot__dim">
                {'{'} startTime: "{hhmm(response.start)}", serviço: {service.minutes} min {'}'}
              </span>
            </div>
            {response.code === 201 && (
              <div className="slot__res slot__res--ok">
                201 Created · pedido em análise de {hhmm(response.start)} a {hhmm(response.end)}. O horário fica
                segurado até a aprovação.
              </div>
            )}
            {response.code === 409 && (
              <div className="slot__res slot__res--err">
                409 Conflict · conflita com “{response.with.label}” ({hhmm(response.with.start)}–
                {hhmm(response.with.end)})
                <span className="slot__pg">
                  ERROR: conflicting key value violates exclusion constraint "no_overlapping_appointments"
                </span>
              </div>
            )}
            {response.code === 400 && (
              <div className="slot__res slot__res--warn">
                400 Bad Request · terminaria às {hhmm(response.end)}, depois do expediente (22:00).
              </div>
            )}
          </>
        ) : (
          <div className="slot__dim">› clique num horário da linha do tempo. Tente cair em cima de outro pedido.</div>
        )}
      </div>

      <details className="slot__sql">
        <summary className="mono">ver a constraint no PostgreSQL</summary>
        <pre>
          <code>{`ALTER TABLE "Appointments"
  ADD CONSTRAINT no_overlapping_appointments
  EXCLUDE USING gist (
    tstzrange("StartTime", "EndTime") WITH &&
  )
  WHERE ("Status" NOT IN ('Cancelled', 'Rejected', 'Expired'));`}</code>
        </pre>
      </details>

      <div className="slot__fee">
        <label htmlFor="km" className="mono">
          distância de carro até a cliente: <strong>{km.toLocaleString('pt-BR')} km</strong>
        </label>
        <input id="km" type="range" min={0} max={30} step={0.5} value={km} onChange={(e) => setKm(Number(e.target.value))} />
        <div className="slot__fee-out">
          <span className="mono slot__dim">
            {km <= FREE_KM
              ? 'os primeiros 5 km são isentos ='
              : `(${km.toLocaleString('pt-BR')} − 5) × R$ 5 × 2 (ida e volta) =`}
          </span>
          <strong>
            {fee === 0 ? 'deslocamento gratuito' : fee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        </div>
      </div>
    </LabFrame>
  );
}
