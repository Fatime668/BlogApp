import { ActivityIndicator, Image ,TouchableOpacity,StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { removeSavedItem } from '../redux/slices/SaveSlice'
import { SafeAreaView } from 'react-native-safe-area-context'

const BlogSave = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector<RootState,any>((state:any)=>state.blogSlice)
  const savedItems:any = useSelector((state:any)=>state.savedItemsSlice)

  const handleRemoveSavedItems = (id:number) =>{
    dispatch(removeSavedItem(id))
  }
  if (savedItems.length === null) {
    return (
      <SafeAreaView>
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Text>Empty Cart</Text>
        </View>
      </SafeAreaView>
    )
  }
  return (
   <SafeAreaView>
    {
      loading == 'pending' ? <View><ActivityIndicator/></View>:
      <FlatList
      refreshing={false}
      data={savedItems}
      keyExtractor={item=>item.id.toString()}
      showsVerticalScrollIndicator = {false}
      renderItem={({item}:any)=>(
        <View
        style={{
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Image source={{uri: item.avatar}} style={styles?.avatar} />
        <TouchableOpacity
          style={styles.bookmark}
          onPress={() => handleRemoveSavedItems(item.id)}>
         
        </TouchableOpacity>
        <View style={styles.detInfo}>
          <Text
            >
            {item?.title}
          </Text>

         
          <Text
           >
            {item?.description}
          </Text>
        </View>
      </View>
      )}
      />
    }
   </SafeAreaView>
  )
}

export default BlogSave

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  darkContainer: {
    backgroundColor: '#151517',
  },
  avatar: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  createdAt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detInfo: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  editLine: {
    flexDirection: 'row',
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 45,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#000',
    padding: 5,
  },
})