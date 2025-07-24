import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./AuthContext"

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoggedIn from './screens/authenticated/LoggedIn'
import LandingScreen from './screens/LandingScreen'
import SendProcess from './screens/authenticated/sending/SendProcess';
import Sending from './screens/authenticated/sending/Sending';
import SendToNumber from './screens/authenticated/sending/SendToNumber';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoggedIn" component={LoggedIn} />
          <Stack.Screen name="SendProcess" component={SendProcess} />
          <Stack.Screen name="Sending" component={Sending} />
          <Stack.Screen name="SendToNumber" component={SendToNumber} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </AuthProvider>
);

export default App;