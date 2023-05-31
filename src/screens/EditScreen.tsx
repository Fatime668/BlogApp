import { ActivityIndicator, TextInput,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { UpdateBlog } from '../redux/slices/BlogSlice'
import { useNavigation } from '@react-navigation/native'

const EditScreen = () => {
    const blog = useSelector<RootState,any>(state=>state.blogSlice.blog)
    const [title,setTitle] = useState<string>(blog.title)
    const [desc,setDesc] =useState<string>(blog.description)
    const dispatch = useDispatch<AppDispatch>()
    
    const navigation:any = useNavigation
    const updateHandler = () =>{
        const payload: any ={
        title:title,
        description:desc,
        id:blog.id
        }
        dispatch(UpdateBlog(payload))
        navigation.goBack()
    }
  return (
    <View style={{gap:10,padding:20,flex:1,backgroundColor:"#fff"}}>
        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>Edit</Text>
        <TextInput style={{padding:20,borderWidth:1,borderColor:"#ccc"}} value={title} onChangeText={setTitle}/>
        <TextInput style={{padding:20,borderWidth:1,borderColor:"#ccc"}}  value={desc} onChangeText={setDesc}/>
        <TouchableOpacity style={{padding:20,backgroundColor:"orange",borderRadius:25}} onPress={updateHandler}>
        <Text style={{textAlign:"center",fontWeight:"bold",color:"#fff"}}>Update</Text>
        </TouchableOpacity>
    </View>

  )
}

export default EditScreen

const styles = StyleSheet.create({})