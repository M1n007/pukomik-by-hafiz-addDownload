import { combineReducers } from 'redux';

import nav from './nav'
import {browseReducer} from './browse'
import {mangaDetailsReducer} from './mangaDetails'
import {chapterListReducer} from './chapterList'
import {pagesReducer} from './pages'
import {bookmarksReducer} from './bookmarks'

const AppReducer = combineReducers({
  nav,
  browseReducer,
  mangaDetailsReducer,
  chapterListReducer,
  pagesReducer,
  bookmarksReducer
});

export default AppReducer;
