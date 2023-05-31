import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BlogSave from './src/screens/BlogSave'
import BlogStack from './src/navigation/stack/BlogStack'
import { Provider } from 'react-redux'
import store from './src/redux'
import BlogScreen from './src/screens/BlogScreen'
import CreateBlogScreen from './src/screens/CreateBlogScreen'


const Tab = createBottomTabNavigator()
const App = () => {
  return (
 <Provider store={store}>
   <NavigationContainer>
    <Tab.Navigator  screenOptions={{
       headerStyle: { backgroundColor: '#fff' }
    }}>
      <Tab.Screen name="Blogs" component={BlogStack} options={{title:''}}/>
      <Tab.Screen name="Save" component={BlogSave} options={{title:''}}/>
      <Tab.Screen name="Create" component={CreateBlogScreen} options={{title:''}}/>
    </Tab.Navigator>
  </NavigationContainer>
 </Provider>
  )
}

export default App

const styles = StyleSheet.create({})