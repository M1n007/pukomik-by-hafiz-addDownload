import RootNavigator from '../navigators/RootNavigator';

const initialNavState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Main'));

function navReducer(state = initialNavState, action) {
  let nextState = RootNavigator.router.getStateForAction(action, state)

  return nextState || state;
}


export default navReducer
