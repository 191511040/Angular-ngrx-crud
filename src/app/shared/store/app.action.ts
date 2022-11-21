import { Appstate } from './appstate';
import { createAction, props } from '@ngrx/store';
export const setapiStatus=createAction(
  '[API Status] success or failure status',props<{apiStatus:Appstate}>()
)
