import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import NewPost from '../screens/NewPost'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
import UserPosts from '../screens/UserPosts'

export type stackAppNavigationProps = {
  Home: undefined,
  UserPosts: {
    uid: string,
    name: string
  }
}

export type propsStack = NativeStackNavigationProp<stackAppNavigationProps>

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<stackAppNavigationProps>()

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='UserPosts'
        component={UserPosts}
        options={{
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#eb5e11',
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#eb5e11',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='home-outline' color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='search-outline' color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name='NewPost'
        component={NewPost}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='add-circle-outline' color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='person-outline' color={color} size={size} />
          }
        }}
      />

    </Tab.Navigator>
  )
}
