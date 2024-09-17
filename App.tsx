import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://favqs.com/api/qotd')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote.body);
        setAuthor(data.quote.author);})
      .catch(error => console.error(error));
  };

  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    
    <View style={[styles.container, isDarkMode? styles.darktheme : styles.lighttheme]}>
      <View style={styles.header}>
        <Text style={[styles.heading, isDarkMode? styles.darktheme : styles.lighttheme]}>Quote OF The  Day</Text>
      </View>
     
      <View style={styles.card}>
        
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.author}> - {author}</Text>
        <TouchableOpacity style={styles.btn} onPress={handleRefresh}>
          <Text style={{color:'#7d7e7d'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  darktheme:{
    backgroundColor:'#000000',
    color: '#ffffff'
  },
  lighttheme:{
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  header:{
    marginTop:-50,
    marginBottom: 100,
  },
  heading:{
    fontSize: 45,
    
    // fontWeight: 500
    
  },
  card: {
    margin:10,
    backgroundColor: '#C428F9',
    padding: 20,
    borderRadius: 10,
   
  },
  quote: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff'
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    paddingRight:25,
    color: '#fff'

  },
  btn: {
    marginTop: 5,
    padding: 8,   
    borderRadius: 5,
    width:'90%',
    backgroundColor:'#e7e7e7',
    alignSelf:'flex-end'

  },
});

export default App;