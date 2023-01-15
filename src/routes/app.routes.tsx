import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import NewPost from '../screens/NewPost'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
// import UserPosts from '../screens/UserPosts'

const Tab = createBottomTabNavigator()

export default function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='NewPost' component={NewPost} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}
