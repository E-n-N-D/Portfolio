'use client';

import { useState, useEffect, useCallback, ReactNode, Fragment } from 'react';
import type { ITeam, IPlayer, IMedals } from '@/types';

// ─── Medal config ─────────────────────────────────────────────────────────────

interface MedalConfig {
  key: keyof IMedals;
  label: string;
  icon: string;
  pts: number;
  color: string;
}

const MEDALS: MedalConfig[] = [
  { key: 'gold',   label: '1st', icon: '🥇', pts: 3, color: '#F59E0B' },
  { key: 'silver', label: '2nd', icon: '🥈', pts: 2, color: '#94A3B8' },
  { key: 'bronze', label: '3rd', icon: '🥉', pts: 1, color: '#B45309' },
];

const calcTotal = (medals: IMedals): number =>
  (medals?.gold ?? 0) * 3 + (medals?.silver ?? 0) * 2 + (medals?.bronze ?? 0);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Team form ────────────────────────────────────────────────────────────────

interface TeamFormProps {
  initial?: Partial<ITeam>;
  onSave: (data: { name: string; color: string }) => Promise<void>;
  onClose: () => void;
}

function TeamForm({ initial, onSave, onClose }: TeamFormProps) {
  const [name,  setName]  = useState(initial?.name  ?? '');
  const [color, setColor] = useState(initial?.color ?? '#6366f1');
  const [busy,  setBusy]  = useState(false);
  const [err,   setErr]   = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setErr('Name is required'); return; }
    setBusy(true);
    setErr('');
    try {
      await onSave({ name: name.trim(), color });
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong');
      setBusy(false);
    }
  };

  return (
    <>
      <div className="form-group">
        <label>Team name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Red Dragons"
          autoFocus
        />
      </div>
      <div className="form-group">
        <label>Team colour</label>
        <div className="color-row">
          <input
            type="color"
            className="color-swatch"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <span className="color-hex">{color}</span>
        </div>
      </div>
      {err && <p className="form-error">{err}</p>}
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    </>
  );
}

// ─── Player form ──────────────────────────────────────────────────────────────

interface PlayerFormProps {
  initial?: Partial<IPlayer>;
  teams: ITeam[];
  onSave: (data: { name: string; teamId: string }) => Promise<void>;
  onClose: () => void;
}

function PlayerForm({ initial, teams, onSave, onClose }: PlayerFormProps) {
  const [name,   setName]   = useState(initial?.name          ?? '');
  const [teamId, setTeamId] = useState(initial?.team?._id     ?? teams[0]?._id ?? '');
  const [busy,   setBusy]   = useState(false);
  const [err,    setErr]    = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setErr('Name is required'); return; }
    if (!teamId)       { setErr('Select a team');   return; }
    setBusy(true);
    setErr('');
    try {
      await onSave({ name: name.trim(), teamId });
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Something went wrong');
      setBusy(false);
    }
  };

  return (
    <>
      <div className="form-group">
        <label>Player name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jane Smith"
          autoFocus
        />
      </div>
      <div className="form-group">
        <label>Team</label>
        <select className="form-input" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
      </div>
      {err && <p className="form-error">{err}</p>}
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    </>
  );
}

// ─── Medal editor ─────────────────────────────────────────────────────────────

interface MedalEditorProps {
  player: IPlayer;
  onSave: (medals: IMedals) => Promise<void>;
  onClose: () => void;
}

function MedalEditor({ player, onSave, onClose }: MedalEditorProps) {
  const [medals, setMedals] = useState<IMedals>({ ...player.medals });
  const [busy,   setBusy]   = useState(false);

  const adjust = (key: keyof IMedals, delta: number) =>
    setMedals((prev) => ({ ...prev, [key]: Math.max(0, (prev[key] ?? 0) + delta) }));

  const handleSave = async () => {
    setBusy(true);
    await onSave(medals);
    onClose();
  };

  return (
    <>
      <p className="medal-player-name">{player.name}</p>
      <div className="medal-rows">
        {MEDALS.map(({ key, icon, label, color }) => (
          <div key={key} className="medal-row">
            <span className="medal-icon-lg" style={{ color }}>{icon}</span>
            <span className="medal-label">{label}</span>
            <button className="stepper-btn" onClick={() => adjust(key, -1)}>−</button>
            <span className="stepper-val">{medals[key] ?? 0}</span>
            <button className="stepper-btn" onClick={() => adjust(key, +1)}>+</button>
          </div>
        ))}
      </div>
      <p className="medal-total">
        Total: <strong>{calcTotal(medals)} pts</strong>
      </p>
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={busy}>
          {busy ? 'Saving…' : 'Update'}
        </button>
      </div>
    </>
  );
}

// ─── Modal state union type ───────────────────────────────────────────────────

type ModalState =
  | { type: 'addTeam' }
  | { type: 'editTeam';   payload: ITeam }
  | { type: 'addPlayer' }
  | { type: 'editPlayer'; payload: IPlayer }
  | { type: 'medals';     payload: IPlayer };

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const [teams,   setTeams]   = useState<ITeam[]>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<ModalState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  const closeModal = useCallback(() => setModal(null), []);

  const verifyAdmin = useCallback(async () => {
    const password = window.prompt('Enter admin password');
    if (password === null) return;
    if (!password.trim()) {
      alert('Password required');
      return;
    }

    setAuthBusy(true);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          data && typeof data.error === 'string'
            ? data.error
            : 'Invalid password';
        throw new Error(message);
      }

      setIsAdmin(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      alert(message);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [tr, pr] = await Promise.all([
      fetch('/api/teams').then((r) => r.json()),
      fetch('/api/players').then((r) => r.json()),
    ]);
    setTeams(Array.isArray(tr) ? (tr as ITeam[]) : []);
    setPlayers(Array.isArray(pr) ? (pr as IPlayer[]) : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Team CRUD ──────────────────────────────────────────────────────────────
  const saveTeam = async (data: { name: string; color: string }, id?: string) => {
    const res = await fetch(id ? `/api/teams/${id}` : '/api/teams', {
      method:  id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchAll();
  };

  const deleteTeam = async (id: string) => {
    if (!confirm('Delete team and ALL its players?')) return;
    await fetch(`/api/teams/${id}`, { method: 'DELETE' });
    await fetchAll();
  };

  // ── Player CRUD ────────────────────────────────────────────────────────────
  const savePlayer = async (
    data: { name: string; teamId: string },
    id?: string
  ) => {
    const res = await fetch(id ? `/api/players/${id}` : '/api/players', {
      method:  id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchAll();
  };

  const deletePlayer = async (id: string) => {
    if (!confirm('Delete this player?')) return;
    await fetch(`/api/players/${id}`, { method: 'DELETE' });
    await fetchAll();
  };

  const saveMedals = async (id: string, medals: IMedals) => {
    const res = await fetch(`/api/players/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ medals }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    await fetchAll();
  };

  // ── Group + sort ───────────────────────────────────────────────────────────
  const grouped = teams
    .map((team) => ({
      team,
      members: players
        .filter((p) => (p.team?._id ?? p.team) === team._id)
        .sort((a, b) => calcTotal(b.medals) - calcTotal(a.medals)),
    }))
    .filter((g) => g.members.length > 0);

  const ungrouped = players.filter(
    (p) => !teams.some((t) => t._id === (p.team?._id ?? p.team))
  );

  const tableColSpan = 3 + MEDALS.length + (isAdmin ? 1 : 0);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Sora', 'DM Sans', system-ui, sans-serif;
          background: #0a0c10;
          color: #e2e8f0;
          min-height: 100vh;
        }
        .lb-page { max-width: 960px; margin: 0 auto; padding: 2.5rem 1.25rem 5rem; }
        .lb-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 2.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .lb-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1;
          background: linear-gradient(135deg, #fff 30%, #94a3b8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .lb-subtitle {
          font-size: 0.8rem; color: #475569; letter-spacing: 0.12em;
          text-transform: uppercase; margin-top: 0.35rem;
        }
        .header-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1rem; border-radius: 8px; border: none;
          font-size: 0.8rem; font-weight: 600; cursor: pointer;
          transition: opacity 0.15s, transform 0.1s; white-space: nowrap;
        }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn:not(:disabled):active { transform: scale(0.97); }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:not(:disabled):hover { background: #4f46e5; }
        .btn-ghost { background: transparent; color: #94a3b8; border: 1px solid #1e293b; }
        .btn-ghost:not(:disabled):hover { background: #1e293b; color: #e2e8f0; }
        .btn-danger { background: #7f1d1d33; color: #fca5a5; border: 1px solid #7f1d1d55; }
        .btn-danger:not(:disabled):hover { background: #991b1b55; }
        .btn-sm { padding: 0.3rem 0.65rem; font-size: 0.72rem; border-radius: 6px; }
        .btn-icon { padding: 0.3rem 0.5rem; font-size: 0.75rem; border-radius: 6px; }
        .section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin: 2rem 0 0.75rem;
        }
        .section-title {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #475569;
        }
        .team-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .team-chip {
          display: flex; align-items: center; gap: 0.5rem;
          background: #111827; border: 1px solid #1e293b;
          border-radius: 99px; padding: 0.35rem 0.75rem 0.35rem 0.45rem;
        }
        .team-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .team-chip-name { font-size: 0.8rem; font-weight: 600; }
        .team-chip-actions { display: flex; gap: 0.25rem; margin-left: 0.25rem; }
        .lb-table-wrap {
          margin-top: 2rem; border-radius: 16px; overflow: hidden;
          border: 1px solid #1e293b;
        }
        table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        thead tr { background: #0f172a; border-bottom: 1px solid #1e293b; }
        th {
          padding: 0.75rem 1rem; text-align: left;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #475569;
        }
        th.center, td.center { text-align: center; }
        .group-header td {
          padding: 0.5rem 1rem; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #1e293b;
        }
        .group-label { display: inline-flex; align-items: center; gap: 0.5rem; }
        .group-badge { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        tbody tr.player-row { border-bottom: 1px solid #0f172a; transition: background 0.12s; }
        tbody tr.player-row:hover { background: #111827; }
        tbody tr.player-row:last-child { border-bottom: none; }
        td { padding: 0.65rem 1rem; vertical-align: middle; }
        .player-name { font-weight: 600; }
        .team-tag { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; color: #94a3b8; }
        .medal-cell { font-variant-numeric: tabular-nums; }
        .total-cell { font-weight: 800; font-size: 0.95rem; font-variant-numeric: tabular-nums; }
        .row-actions { display: flex; gap: 0.35rem; }
        .empty-state { text-align: center; padding: 3rem 1rem; color: #334155; }
        .empty-state h3 { font-size: 1rem; margin-bottom: 0.5rem; color: #475569; }
        .empty-state p { font-size: 0.8rem; }
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center;
          z-index: 50; backdrop-filter: blur(4px); padding: 1rem;
        }
        .modal-box {
          background: #111827; border: 1px solid #1e293b; border-radius: 16px;
          width: 100%; max-width: 420px; padding: 1.5rem;
          animation: modal-in 0.18s ease;
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .modal-title { font-weight: 700; font-size: 1rem; }
        .modal-close { background: none; border: none; color: #475569; font-size: 1rem; cursor: pointer; padding: 0.2rem; }
        .modal-close:hover { color: #e2e8f0; }
        .form-group { margin-bottom: 1rem; }
        .form-group label {
          display: block; font-size: 0.72rem; font-weight: 600; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.4rem;
        }
        .form-input {
          width: 100%; background: #0f172a; border: 1px solid #1e293b; border-radius: 8px;
          padding: 0.55rem 0.75rem; color: #e2e8f0; font-size: 0.875rem;
          outline: none; transition: border-color 0.15s;
        }
        .form-input:focus { border-color: #6366f1; }
        .color-row { display: flex; align-items: center; gap: 0.75rem; }
        .color-swatch {
          width: 40px; height: 36px; border-radius: 8px; border: 1px solid #1e293b;
          cursor: pointer; background: none; padding: 2px;
        }
        .color-hex { font-size: 0.8rem; color: #64748b; font-family: monospace; }
        .form-error { color: #f87171; font-size: 0.8rem; margin-bottom: 0.75rem; }
        .form-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
        .medal-player-name {
          font-weight: 700; font-size: 1.05rem; text-align: center;
          margin-bottom: 1.25rem; color: #cbd5e1;
        }
        .medal-rows { display: flex; flex-direction: column; gap: 0.75rem; }
        .medal-row {
          display: flex; align-items: center; gap: 0.75rem;
          background: #0f172a; border: 1px solid #1e293b;
          border-radius: 10px; padding: 0.6rem 1rem;
        }
        .medal-icon-lg { font-size: 1.4rem; }
        .medal-label { flex: 1; font-size: 0.8rem; font-weight: 600; color: #94a3b8; }
        .stepper-btn {
          width: 28px; height: 28px; border-radius: 6px; border: 1px solid #1e293b;
          background: #1e293b; color: #e2e8f0; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .stepper-btn:hover { background: #334155; }
        .stepper-val { width: 2rem; text-align: center; font-weight: 700; font-variant-numeric: tabular-nums; }
        .medal-total { text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #64748b; }
        .medal-total strong { color: #e2e8f0; }
        .loading { display: flex; align-items: center; justify-content: center; min-height: 50vh; color: #334155; font-size: 0.9rem; }
      `}</style>

      <div className="lb-page">
        {/* Header */}
        <div className="lb-header">
          <div>
            <h1 className="lb-title">Leaderboard</h1>
            <p className="lb-subtitle">🥇 3 pts · 🥈 2 pts · 🥉 1 pt</p>
          </div>
          <div className="header-actions">
            <button
              className="btn btn-ghost"
              onClick={verifyAdmin}
              disabled={authBusy || isAdmin}
            >
              {isAdmin ? 'Admin verified' : authBusy ? 'Verifying...' : 'Verify as admin'}
            </button>
            {isAdmin && (
              <>
                <button className="btn btn-ghost" onClick={() => setModal({ type: 'addTeam' })}>
                  + Team
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setModal({ type: 'addPlayer' })}
                  disabled={teams.length === 0}
                >
                  + Player
                </button>
              </>
            )}
          </div>
        </div>

        {/* Teams */}
        {teams.length > 0 && (
          <>
            <div className="section-header">
              <span className="section-title">Teams</span>
            </div>
            <div className="team-chips">
              {teams.map((t) => (
                <div key={t._id} className="team-chip">
                  <span className="team-dot" style={{ background: t.color }} />
                  <span className="team-chip-name">{t.name}</span>
                  {isAdmin && (
                    <div className="team-chip-actions">
                      <button
                        className="btn btn-ghost btn-icon"
                        onClick={() => setModal({ type: 'editTeam', payload: t })}
                        title="Edit team"
                      >✏️</button>
                      <button
                        className="btn btn-danger btn-icon"
                        onClick={() => deleteTeam(t._id)}
                        title="Delete team"
                      >🗑</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Table */}
        {loading ? (
          <div className="loading">Loading…</div>
        ) : players.length === 0 ? (
          <div className="empty-state">
            <h3>No players yet</h3>
            <p>Add a team first, then add players to get started.</p>
          </div>
        ) : (
          <div className="lb-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Team</th>
                  {MEDALS.map((m) => (
                    <th key={m.key} className="center">{m.icon} {m.label}</th>
                  ))}
                  <th className="center">Total</th>
                  {isAdmin && <th />}
                </tr>
              </thead>
              <tbody>
                {grouped.map(({ team, members }) => (
                  <Fragment key={`group-${team._id}`}>
                    <tr
                      className="group-header"
                      style={{ background: `${team.color}18` }}
                    >
                      <td colSpan={tableColSpan}>
                        <span className="group-label">
                          <span className="group-badge" style={{ background: team.color }} />
                          <span style={{ color: team.color }}>{team.name}</span>
                        </span>
                      </td>
                    </tr>
                    {members.map((p) => (
                      <tr key={p._id} className="player-row">
                        <td><span className="player-name">{p.name}</span></td>
                        <td>
                          <span className="team-tag">
                            <span style={{
                              width: 7, height: 7, borderRadius: '50%',
                              background: team.color, display: 'inline-block', flexShrink: 0,
                            }} />
                            {team.name}
                          </span>
                        </td>
                        {MEDALS.map((m) => (
                          <td key={m.key} className="center medal-cell">
                            {p.medals[m.key] > 0
                              ? <>{m.icon} {p.medals[m.key]}</>
                              : <span style={{ color: '#1e293b' }}>—</span>}
                          </td>
                        ))}
                        <td className="center total-cell">{calcTotal(p.medals)}</td>
                        {isAdmin && (
                          <td>
                            <div className="row-actions">
                              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: 'medals', payload: p })}>🏅</button>
                              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: 'editPlayer', payload: p })}>✏️</button>
                              <button className="btn btn-danger btn-sm" onClick={() => deletePlayer(p._id)}>🗑</button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {ungrouped.map((p) => (
                  <tr key={p._id} className="player-row">
                    <td><span className="player-name">{p.name}</span></td>
                    <td><span style={{ color: '#475569', fontSize: '0.75rem' }}>—</span></td>
                    {MEDALS.map((m) => (
                      <td key={m.key} className="center medal-cell">
                        {p.medals[m.key] > 0
                          ? <>{m.icon} {p.medals[m.key]}</>
                          : <span style={{ color: '#1e293b' }}>—</span>}
                      </td>
                    ))}
                    <td className="center total-cell">{calcTotal(p.medals)}</td>
                    {isAdmin && (
                      <td>
                        <div className="row-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: 'medals', payload: p })}>🏅</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: 'editPlayer', payload: p })}>✏️</button>
                          <button className="btn btn-danger btn-sm" onClick={() => deletePlayer(p._id)}>🗑</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'addTeam' && (
        <Modal title="Add team" onClose={closeModal}>
          <TeamForm onSave={(d) => saveTeam(d)} onClose={closeModal} />
        </Modal>
      )}

      {modal?.type === 'editTeam' && (
        <Modal title="Edit team" onClose={closeModal}>
          <TeamForm
            initial={modal.payload}
            onSave={(d) => saveTeam(d, modal.payload._id)}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'addPlayer' && (
        <Modal title="Add player" onClose={closeModal}>
          <PlayerForm teams={teams} onSave={(d) => savePlayer(d)} onClose={closeModal} />
        </Modal>
      )}

      {modal?.type === 'editPlayer' && (
        <Modal title="Edit player" onClose={closeModal}>
          <PlayerForm
            initial={modal.payload}
            teams={teams}
            onSave={(d) => savePlayer(d, modal.payload._id)}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'medals' && (
        <Modal title="Update medals" onClose={closeModal}>
          <MedalEditor
            player={modal.payload}
            onSave={(medals) => saveMedals(modal.payload._id, medals)}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
}
