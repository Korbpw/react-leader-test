import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Login from './Login';
import Loading from './Loading';
import User from './User';

const AuthStack = createStackNavigator(
  {
    Login: Login,
    User: {screen: User},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    animationEnabled: false,
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Loading,
      App: User,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      animationEnabled: false,
    },
  ),
);
