import { createSelector } from 'reselect';
import { RootState } from '../store';
import { GameState } from './game.reducer';

export const selectGameReducer = (state: RootState): GameState => state.game;

export const selectGameDate = createSelector([selectGameReducer], (game) => game.date);
export const selectGameTeams = createSelector([selectGameReducer], (game) => game.teams);
export const selectGamesData = createSelector([selectGameReducer], (game) => game.gamesData);
export const selectGamesList = createSelector([selectGameReducer], (game) => game.gamesList);
export const selectGameRounds = createSelector([selectGameReducer], (game) => game.rounds);
export const selectGameIsLoading = createSelector([selectGameReducer], (game) => game.isLoading);
