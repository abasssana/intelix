
import React from 'react';
import {View, Text, AsyncStorage, Alert, TouchableOpacity, TextInput} from 'react-native';
import firebase from 'firebase';

import User from '../User';
import styles from '../constants/styles';

export default class LoginScreen extends React.Component{
  static navigationOptions = {
      header: null,
  }

  state = {
    phone:'',
    name: ''
  }

  handleChange = key => val =>{
    this.setState({ [key] : val})
  }

  /* componentdimount
  componentDidMount(){
    AsyncStorage.getItem('userPhone').then(val =>{
      if(val){
        this.setState({phone:val})
      }
    });
    AsyncStorage.getItem('userName').then(val =>{
      if(val){
        this.setState({name:val})
      }
    });
  }*/
  
  submitForm = async () =>{
    if(this.state.phone.length<10 ){
      Alert.alert("Error", "Wrong phone number")
    } else if(this.state.name.length < 3){
      Alert.alert("Error", "Wrong name")
    }else{
      //Save user data
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({name: this.state.name});
      this.props.navigation.navigate('App')
    }
  }

  render(){
    return(
      <View style={styles.container}>
          <TextInput 
            placeHolder= "Phone number"
            keyboardType="number-pad"
            style={styles.input}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
          />
          <TextInput 
            placeHolder= "Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <TouchableOpacity onPress={this.submitForm}>
              <Text style={styles.btnText}>Enter</Text>
          </TouchableOpacity>
      </View>
    )
  }


}
