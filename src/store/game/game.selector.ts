import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Game } from './game.types';

export const selectGameReducer = (state: RootState): Game => state.game;

export const selectGameDate = createSelector([selectGameReducer], (game) => game.date);
export const selectGameTeams = createSelector([selectGameReducer], (game) => game.teams);
