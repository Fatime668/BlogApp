import { ActivityIndicator, AppConfig,FlatList,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { DeleteBlog, GetAllBlogs,toggleDarkMode } from '../redux/slices/BlogSlice'

const BlogScreen = ({navigation}:any) => {

    const goToDetail = (id:number) =>{
        navigation.navigate('Detail',{id:id})
    }
    const dispatch = useDispatch<AppDispatch>()
    const {blogs,loading,error,theme} = useSelector<RootState,any>(state => state.blogSlice)

    useEffect(() => {
      dispatch(GetAllBlogs())
      console.log(blogs);
      
    }, [])
    const deleteHandle = (id: number) => {
        dispatch(DeleteBlog(id))
    }
    const handleToggleTheme =()=>{
        dispatch(toggleDarkMode)
    }
    if (error) {
        return (
            <View style={[
                styles.contain,
                theme==='dark' && {backgroundColor:"#151517"},
            ]}>
                <ActivityIndicator/>
            </View>
        )
    }
    if (error) {
        return(
            <View style={[
                styles.contain,
                theme==='dark' && {backgroundColor:"#151517"},
            ]}>
              <Text style={[{fontSize:18},theme==='dark'&&{color:"#e3e3e3"}]}>
                Error:{error}
              </Text>
            </View>
        )
    }
  return (
    loading=='pending' ? <View><ActivityIndicator/></View>:
    <View style={{flex:1,backgroundColor:"#fff"}}>
   
    <Text style={{marginHorizontal:24,marginBottom:10}}>Papular Post</Text>
     <FlatList
    data = {blogs}
    renderItem={({item})=>(
        <TouchableOpacity onPress={()=>goToDetail(item.id)}>
            <View style={styles.container}>
                <View style={styles.imgbox}>
                <Image style={styles.img} source={{uri:item.avatar}} />
               
                <TouchableOpacity onPress={()=>deleteHandle(item.id)} style={{position:"absolute",bottom:20,right:55,zIndex:1}}>
                   <Image style={{tintColor:"tomato",height:24,width:24}} source={require('../image/del.png')}/>
                </TouchableOpacity>
                </View>
               <View style={styles.txt}>
               <Text style={{color:'#000',fontSize:20,fontWeight:"600",marginBottom:10}}>{item.title}</Text>
               <Text style={{color:'#000'}}>{item.description}</Text>
               </View>
              
            </View>
        </TouchableOpacity>
  )}
    
    />
    </View>
   

  )
}

export default BlogScreen

const styles = StyleSheet.create({
    contain:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    img:{
        width:350,
        height:300,
        marginHorizontal:20,
        borderRadius:25,
        
    },
    container:{
        backgroundColor:"#fff",
        flex:1,
       
    },
    imgbox:{
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 8,
},
shadowOpacity: 0.46,
shadowRadius: 11.14,

elevation: 17,
    },
    txt:{
        width:350,
        padding:10,
        marginVertical:10,
        marginHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
    }
})