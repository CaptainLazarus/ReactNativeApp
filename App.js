import React from 'react';
import { 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity,
          FlatList,
          TextInput,
          Alert,
          AsyncStorage    
        } 
        from 'react-native';
import { stringify } from 'qs';


class Subject extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sub: props.subject,
      present: 0 , 
      absent: 0 ,
    }
    this.calcpercentage = this.calcpercentage.bind(this)
  }

   calcpercentage(){
    let a = this.state.present;
    let b = this.state.absent;
    if(a+b > 0)
    {
      var c = 100*a/(a+b);
      Alert.alert(c.toString())
    }
  }
 
  render(){
    return(
      <View style = {styles.subject}>
        <TouchableOpacity style = {styles.subbutton} onPress = {() => this.setState({sub: this.state.sub, present: this.state.present + 1 , absent: this.state.absent})}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.subbutton} onPress = {() => this.setState({sub: this.state.sub, present: this.state.present , absent: this.state.absent + 1})}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.calcpercentage}>
          <Text style = {styles.listtext}>{this.state.sub}</Text>
        </TouchableOpacity>
        <Text style = {styles.listnumbers}>{this.state.present}</Text>
        <Text style = {styles.listnumbers}>{this.state.absent}</Text>
      </View>

      
    );
  }
}

export default class App extends React.Component {
  
  constructor(){
    super();
    var i = 0;
    this.state = {
      subjects: [],
      text: "",
      count: 0
    };
    this.click = this.click.bind(this)
  }

  click(){
    let updatedSubjects = this.state.subjects.concat( {sub: this.state.text  , present: 0 , absent: 0} )
    if( !(this.state.text === " ")){
      this.setState({subjects: updatedSubjects , text: this.state.text , count: this.count})
/*       this.state.subjects.push( {sub: a  , present: 0 , absent: 0} ) */
    }
  }

  deleteItem = data => {
    let allItems = [...this.state.subjects];
    let filteredItems = allItems.filter(item => item.sub != data.sub);
    this.setState({ subjects: filteredItems })
  }
  render() {
    return (
      <View style = {styles.total}>
        <View style = {styles.header}>
          <TextInput style = {styles.input} placeholder = "Enter Here" placeholderTextColor = "blue" 
            onChangeText = { (text) => this.setState({text}) }>
          </TextInput>
          <TouchableOpacity style = {styles.button} onPress = {this.click}>
            <Text style = {styles.text}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.body}>
          <FlatList
            data = {this.state.subjects}
            renderItem = { ({item}) =>  
            <View style = {styles.totalsub}>
              <Subject subject = {item.sub} present = {item.present} absent = {item.absent} ></Subject> 
              <TouchableOpacity onPress = {() => this.deleteItem(item)} style = {styles.deleteButton}>
                <Text>#</Text>
              </TouchableOpacity>
            </View>
            }
            extraData = {this.state}
          />
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total:{
    backgroundColor: "black",
    flex: 1,
  },
  header:{
    backgroundColor: "skyblue",
    flex: 1,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,

    flexDirection: "row",
    justifyContent: "center",
  },
  body:{
    backgroundColor: "skyblue",
    flex: 7,
    marginTop: 10,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    
  },
  footer:{},
  button:{
    backgroundColor: "red",
    marginLeft : 20,
    marginTop: 20,
    marginBottom : 20,
    width : 140,
    height : 40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  input:{
    marginLeft : 20,
    marginTop: 20,
    marginBottom : 20,
    fontSize: 20,
    maxWidth: 50,
    width: 50,
  },
  subject:{
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around"
  },
  subbutton:{
    marginLeft : 4,
    marginRight : 4,
    marginTop: 10,
    marginBottom : 10,
    backgroundColor: "red",
    width : 50,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  listtext:{
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 50,
    maxHeight: 40,
    width: 50,
  },
  listnumbers:{
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 50,
    maxHeight: 40,
    width: 14,
  },
  totalsub:{
    flexDirection: "row",
    alignContent : "center",
    alignItems: "center",
    marginRight:20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  },
  deleteButton:{
    borderRadius: 30,
    height: 40,
    width: 40,
    backgroundColor: "orange",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    
  }
});