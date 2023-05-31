import { StyleSheet,TextInput,Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { CreateBlog } from '../redux/slices/BlogSlice'

const CreateBlogScreen = () => {
    const [title,setTitle] = useState<string>('')
    const [desc,setDesc] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const {blog} = useSelector<RootState,any>((state)=>state.blogSlice)

    const handlerCreate =()=>{
      const payload:any ={
        title:title,
        description:desc
       
      }
      dispatch(CreateBlog(payload))
      setDesc('')
      setTitle('')
    }

  return (
    <View style={{gap:10,padding:20,flex:1,backgroundColor:"#fff"}}>
    <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>Create</Text>
    <TextInput style={{padding:20,borderWidth:1,borderColor:"#ccc"}} value={title} onChangeText={setTitle}/>
    <TextInput style={{padding:20,borderWidth:1,borderColor:"#ccc"}}  value={desc} onChangeText={setDesc}/>
    <TouchableOpacity style={{padding:20,backgroundColor:"green",borderRadius:25}} onPress={handlerCreate}>
    <Text style={{textAlign:"center",fontWeight:"bold",color:"#fff"}}>Create</Text>
    </TouchableOpacity>
</View>
  )
}

export default CreateBlogScreen

const styles = StyleSheet.create({})