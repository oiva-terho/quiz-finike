import { createSelector } from 'reselect';
import { RootState } from '../store';
import { GameState } from './game.reducer';

export const selectGameReducer = (state: RootState): GameState => state.game;

export const selectCurrentGame = createSelector([selectGameReducer], (game) => game.currentGame);
