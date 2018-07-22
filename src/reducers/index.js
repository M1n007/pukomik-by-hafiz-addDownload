import { combineReducers } from 'redux';

import nav from './nav'
import {browseReducer} from './browse'
import {mangaDetailsReducer} from './mangaDetails'
import {chapterListReducer} from './chapterList'
import {pagesReducer} from './pages'

const AppReducer = combineReducers({
  nav,
  browseReducer,
  mangaDetailsReducer,
  chapterListReducer,
  pagesReducer
});

export default AppReducer;
