import {View, Text, FlatList, Dimensions, StatusBar, Image,Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {faker} from '@faker-js/faker';

const {width, height} = Dimensions.get('screen');
const generateFakeUser = () => {
  const name = faker.internet.userName();
  const photo = faker.image.avatar();
  const email = faker.internet.email();
  return {name, photo, email};
};
export default function App() {
  const [fakeUsers, setFakeUsers] = useState([]);
  const startFrom = StatusBar.currentHeight || 42;
  StatusBar.setBarStyle('light-content', true);
  // const scrollY=useRef().current.animatedValue(0)

  useEffect(() => {
    const generateFakeUserList = () => {
      const users = Array.from({length: 20}, generateFakeUser);
      setFakeUsers(users);
    };
    generateFakeUserList();
  }, []);
const scrollY=useRef(new Animated.Value(0)).current
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: '#161A30',
        paddingTop: startFrom,
      }}>
     
      <Animated.FlatList
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{padding: 10}}
        data={fakeUsers}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{
          nativeEvent:{contentOffset:{y:scrollY}}
        }],
        {useNativeDriver:true}
        )}
     
        renderItem={({item,index}) => {
          const inputRange=[
            -1,
            0,
           (65+40+20)*index, //avatarsize+padding+marginvertical
           (65+40+20)*(index+2)
          ]
          const scale=scrollY.interpolate({
            inputRange,
            outputRange:[1,1,1,0]
          })
          const inputRangeOpacity=[
            -1,
            0,
           (65+40+20)*index, //avatarsize+padding+marginvertical
           (65+40+20)*(index+2)
          ]
          const borderColor=scrollY.interpolate({
            inputRange:inputRangeOpacity,
            outputRange:['#C21292','#C21292','#C21292','transparent']
          })
          console.log((65+40+20)*index,(65+40+20)*(index+2))
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0.5,
               borderColor,
                borderRadius: 12,
                marginVertical: 10,
                transform:[{scale}],
              }}>
              <View style={{padding: 20, marginRight: 2}}>
                <Image
                  source={{uri: item.photo}}
                  style={{height: 60, width: 60, borderRadius: 50}}
                />
              </View>
              <View>
                <Text style={{color: '#fff', fontSize: 16, lineHeight: 20}}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: '#f7f7f7',
                    fontSize: 13,
                    lineHeight: 20,
                    opacity: 0.7,
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
