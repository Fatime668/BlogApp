import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BlogScreen from '../../screens/BlogScreen'
import BlogDetail from '../../screens/BlogDetail'
import EditScreen from '../../screens/EditScreen'
import CreateBlogScreen from '../../screens/CreateBlogScreen'


const Stack = createNativeStackNavigator()
const BlogStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Blogs" component={BlogScreen}/>
      <Stack.Screen name="Detail" component={BlogDetail}/>
      <Stack.Screen name="Edit" component={EditScreen}/>
     
    </Stack.Navigator>
  )
}

export default BlogStack

const styles = StyleSheet.create({})