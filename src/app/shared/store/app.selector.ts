import { Appstate } from './appstate';
import { createFeatureSelector } from '@ngrx/store';
export const selectState= createFeatureSelector<Appstate>('appstate')
