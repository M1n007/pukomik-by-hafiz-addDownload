import React,{Component} from 'react'
import {Text,FlatList,View} from 'react-native'

export default class Testing extends Component{
    render(){
        return(
            <View>
                <FlatList
                    contentContainerStyle={{
                        flexDirection: 'row'
                    }}
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }
}