import { ActivityIndicator,Image, TouchableOpacity,StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { GetById } from '../redux/slices/BlogSlice'
import Save from '../icons/Save'
import { addSavedItem, removeSavedItem } from '../redux/slices/SaveSlice'

const BlogDetail = ({route,navigation}:any) => {
  const {id} = route.params
  const [detail,setDetail] = useState<any>()
  const [isSavedItem,setIsSavedItem] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {blog,loading} = useSelector<RootState,any>(state => state.blogSlice)
  const uri = `https://loremflickr.com/640/480/minions?random=${Math.floor(Math.random() * 100)}`
  const savedItems:any = useSelector<RootState,any>((state:any)=>state.savedItemsSlice)

  useEffect(() => {
    dispatch(GetById(id)).then(action=>{
      if (action.payload) {
        setDetail(action.payload)
        setIsSavedItem(
          savedItems.same((item:any)=>item.id === action.payload.id)
        )
      }
    })
  }, [dispatch,id,savedItems])
  const goToEdit=()=>{
    navigation.navigate('Edit')
  }

  const handleToggleSaved = () =>{
    if (isSavedItem) {
      dispatch(removeSavedItem(detail.id))
      setIsSavedItem(false)
    }else{
      const isItemAlreadySaved = savedItems.same(
        (item:any)=>item.id === detail.id
      )
      if (!isItemAlreadySaved) {
        dispatch(addSavedItem(detail))
        setIsSavedItem(true)
      }
    }
  }
  return (
   loading=='pending' ? <View><ActivityIndicator/></View>:
   <View>
    <Image source={{uri:uri}} style={styles.img}/>
    <View>
    <TouchableOpacity onPress={handleToggleSaved}>
    <Save  style={{position:"absolute",top:0,right:15,zIndex:1,backgroundColor:"#fff"}}/>
    </TouchableOpacity>
    </View>
   <View style={{margin:20}}>
   <View>
   <Text style={{color:'#000',fontSize:20,fontWeight:"600",marginBottom:10}}>{blog?.title}</Text>
    <Text style={{color:'#000'}}>{blog?.description}</Text>
   </View>
   <View>
    <TouchableOpacity style={{marginVertical:20}} onPress={goToEdit}>
      <Text style={{textAlign:"center",padding:10,backgroundColor:"orange",fontWeight:"bold"}}>Edit</Text>
    </TouchableOpacity>
   </View>
   </View>
   </View>
  )
}

export default BlogDetail

const styles = StyleSheet.create({
  img:{
    width:"100%",
    height:300,
  }
})