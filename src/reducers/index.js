import { combineReducers } from 'redux';

import nav from './nav'
import {browseReducer} from './browse'
import {mangaDetailsReducer} from './mangaDetails'
import {chapterListReducer} from './chapterList'
import {pagesReducer} from './pages'
import {bookmarksReducer} from './bookmarks'
import {searchReducer} from './search'

const AppReducer = combineReducers({
  nav,
  browseReducer,
  mangaDetailsReducer,
  chapterListReducer,
  pagesReducer,
  bookmarksReducer,
  searchReducer
});

export default AppReducer;
