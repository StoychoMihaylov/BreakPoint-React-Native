import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/Authentication/AuthLoadingScreen'
import LoginScreen from '../screens/Authentication/LoginScreen'
import RegisterScreen from '../screens/Authentication/RegisterScreen'
import MainTabNavigator from './MainTabNavigator'

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);