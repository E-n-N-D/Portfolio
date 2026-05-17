import type { Types } from 'mongoose';

export interface ITeam {
  _id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMedals {
  gold: number;
  silver: number;
  bronze: number;
}

export interface IPlayer {
  _id: string;
  name: string;
  team: ITeam;
  medals: IMedals;
  total: number;
  createdAt?: string;
  updatedAt?: string;
}

// ── Mongoose document interfaces ──────────────────────────────────────────────

export interface ITeamDocument {
  _id: Types.ObjectId;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlayerDocument {
  _id: Types.ObjectId;
  name: string;
  team: Types.ObjectId;
  medals: IMedals;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// ── API request bodies ────────────────────────────────────────────────────────

export interface TeamRequestBody {
  name: string;
  color: string;
}

export interface PlayerRequestBody {
  name?: string;
  teamId?: string;
  medals?: IMedals;
}
