import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Search from './components/Search';
import Profile from './components/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  

  //set the bottom navigation icons
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
  
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Search') {
        iconName = 'search';
      } else if (route.name === 'Profile') {
        iconName = 'person';
      }
  
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  });

  return (
    <NavigationContainer> 
        <Tab.Navigator screenOptions = { screenOptions }>
            <Tab.Screen name='Home' component={ HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name='Search' component={ Search } options={{ title: 'Search' }} />
            <Tab.Screen name='Profile' component={ Profile } options={{ title: 'Profile'}}/>
        </Tab.Navigator>
    </NavigationContainer> 
  );
  }



//const Stack = createStackNavigator();

//export default function App() {  

 // return (
 //   <NavigationContainer>      
   //   <Stack.Navigator>
     //   <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
       // <Stack.Screen options={{ headerShown: false }} name="BottomNavi" component={BottomNavi} />
      //</Stack.Navigator>
    //</NavigationContainer>
  //);
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
