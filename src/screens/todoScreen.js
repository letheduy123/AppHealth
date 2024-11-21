import { useDispatch, useSelector } from "react-redux";
import {  ScrollView, Text, View,TouchableOpacity,Button, TextInput ,Image,StyleSheet,Pressable, ImageBackground,FlatList, Alert} from "react-native";
import { useEffect, useState } from "react";
import { fetchTodos,deleteTodoApi,addTodoAPI,updateTodoApi} from '../redux/actions/todoAction';
const TodoScreen  =()=>{
    const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
    const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa
    const [editContent, setEditContent] = useState(null); //lưu id bản ghi cần sửa

    const handleEdit = (id, title,content) =>{
        // hàm này để  ẩn hiện form sửa
        setEditTitle(title);
        setIdEdit(id);
        setEditContent(content)
    }
        // hàm lưu kết quả sửa
        const handleUpdate =()=>{ 

            let duLieuUpdate = {  title: editTitle,content :editContent};
            // dispatch( addTodo ( duLieuThem )  );
    
            dispatch(updateTodoApi({id: idEdit, data:duLieuUpdate}))
            .then((result) => {
                // console.log(result);
    
                console.log('Todo update successfully!');
                setEditTitle('');
                setEditContent('')
                setIdEdit(null);
            })
            .catch((error) => {
                console.error('Error update todo:', error);
            });
        }
 
   //lấy  danh sách dữ liệu từ store của redux
   const  listTodo =  useSelector(state=>state.listTodoStore.listTodo);
   // lấy đối tượng để điều khiển các action
   const dispatch = useDispatch();// của redux
   // khi vào ứng dụng sẽ gọi action fetchTodos để kéo dữ liệu từ API về store của redux
   useEffect(() => {
       dispatch(fetchTodos());
     }, []);
     //dialog xóa
     const confirmDelete = (id) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa"),
                    style: "cancel"
                },
                { text: "Đồng ý", onPress: () => handleDeleteTodo(id) }
            ],
            { cancelable: false }
        );
    };

  
         // hàm xử lý xóa
    const handleDeleteTodo =async (id)=>{
      dispatch(deleteTodoApi(id))
          .then((result) => {
              console.log('Todo deleted successfully!');
          })
          .catch((error) => {
              console.error('Error deleting todo:', error);
          });
  }
  //add
  //Khai báo  state để thực hiện thêm
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
    
  // hàm xử lý việc thêm
      const handleAddTodo = ()=>{
        const currentDateTime = new Date().toLocaleString();
          let duLieuThem = {  title: title , content: content,dateTime: currentDateTime};
          // dispatch( addTodo ( duLieuThem )  );
          dispatch(addTodoAPI(duLieuThem))
          .then((result) => {
              // console.log(result);
              console.log('Todo add successfully!');
              setTitle('');
              setContent('');
          })
          .catch((error) => {
              console.error('Error add todo:', error);
          });
      }

      //

      const renderItem = ({ item }) => (
        <View style={st.todoItem}>
            {idEdit === item.id ? (
                <>
   
                    <TextInput
                        style={st.editInput}
                        value={editTitle}
                        onChangeText={setEditTitle}
                        autoFocus
                    />
                    <TextInput
                        style={st.editInput}
                        value={editContent}
                        onChangeText={setEditContent}
                        autoFocus
                    />
                    <Pressable style={{width:60,height:40,padding:4,borderRadius:7,borderWidth:1,borderColor:'gray'}} onPress={handleUpdate}>
                        <Text> Update</Text>
                    </Pressable>
                   
                </>
            ) : (
                <>
                    <View style={st.todoTextContainer}>
                        <Text style={st.todoTitle}>{item.title}</Text>
                        <Text style={st.todoContent}>{item.content}</Text>
                        <Text style={st.todoDateTime}>{item.Date}</Text>
                        <Text style={st.todoDateTime}>{item.dateTime}</Text>
                    </View>
                    <View style={st.buttonContainer}>
                        <TouchableOpacity onPress={() => handleEdit(item.id, item.title, item.content)} style={st.editButton}>
                        <Image source={require('../image/update.png')} style={st.deleteIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={st.deleteButton}>
                            <Image source={require('../image/delete1.png')} style={st.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );


   return (
 
        <ImageBackground source={require('../image/nen.jpg')} >
               <ScrollView>
       <View >
       <View style={{width:'100%',height:50,backgroundColor:'green',flexDirection:'row',justifyContent:'space-between'}}>
         <Image style={{margin:10}} source={ require('../image/gratitude.png')} />
       <Text style={st.title} >Viết lời biết ơn !!</Text>
      <Image style={{margin:10}} source={require('../image/menu.png')}/>

       </View>
            <TextInput style={st.input} placeholder="Nhập tên lời biết ơn" onChangeText={setTitle} />
<TextInput style={st.input} placeholder="Nhập nội dung" onChangeText={setContent} />
<View style={{width:100}}>
 <Pressable style={st.button} onPress={handleAddTodo}>
       <Text style={st.text2}>Share</Text>
     </Pressable>
  
</View>

           {/* in danh sách todo:
           {
               listTodo.map(row =>(
            


                 <View key={row.id}  style={{margin:10,padding:10, borderColor:'gray', borderWidth:5,borderRadius:10,flexDirection:'row',justifyContent:'space-around'}}>
                
                {
                     (idEdit === row.id)?
                     (<>
                      <TextInput
                                          value={editTitle}
                                          onChangeText={setEditTitle}
                                          onBlur={handleUpdate}
                                         
                                      />
                                       <TextInput
                                          value={editContent}
                                          onChangeText={setEditContent}
                                          onBlur={handleUpdate}
                                          autoFocus
                                      />
                                      <Button title="Update" onPress={handleUpdate} />
                             </>
                              )
                              :(
                                <>
                                   <TouchableOpacity onPress={() => handleEdit(row.id, row.title , row.content)}>
                                          <Text>Edit</Text>
                                      </TouchableOpacity>
                                 </>
                              )
                }
                    <View>
                    <Text>{row.title}  </Text>
                    <Text>{row.content}  </Text>
                        </View>
                 

                   <TouchableOpacity style={{width:45,height:40,borderWidth:1,borderColor:'red', backgroundColor:'#58bb3c',borderRadius:10,color:'red',padding:5}} onPress={()=>handleDeleteTodo(row.id)} >
<Image source={require('../image/delete1.png') }/>
</TouchableOpacity>
                 </View> 
               
               ))
           } */}
             <FlatList
                    data={listTodo}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
       </View>
     
       </ScrollView>
       </ImageBackground>
   );
}
export default TodoScreen;
const st = StyleSheet.create({
  title:{
    fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop:13,marginRight:120,
        color:'white',
  },
    input:{
        width: '96%',
        height: 50,
        marginTop:20,
        fontSize:16,
        borderColor: 'gray',
       borderBottomColor:'black',
        alignSelf:'center',
      color:'white',
      borderRadius:10,
      borderWidth:1
      
       
      },
        button:{
        width:80,
        height:40,
        backgroundColor:'#58bb3c',
        borderRadius:5,
        alignSelf:'flex-end',
        paddingLeft:20
        ,margin:10,
        padding:9
          },
          text2:{
        fontSize:16,
        color:'white',
        fontWeight:'600'
          },
          todoItem: {
            margin: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        editInput: {
            width:'80%',
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
        },
        todoTextContainer: {
            flex: 1,
        },
        todoTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        todoContent: {
            fontSize: 16,
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        editButton: {
            marginRight: 10,
       
            padding: 5,
            borderRadius: 5,
        },
        deleteButton: {
        
            padding: 5,
            borderRadius: 5,
        },
        deleteIcon: {
            width: 20,
            height: 20,
        },
        editInput: {
            flex: 1,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
        },
        todoDateTime: {
            fontSize: 14,
            color: 'gray',
        },
})