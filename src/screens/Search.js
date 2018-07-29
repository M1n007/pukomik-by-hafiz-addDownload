import React,{Component} from 'react'
import {Text,StyleSheet,Image,FlatList,TouchableNativeFeedback} from 'react-native'
import {ListItem,View} from 'native-base'
import {connect} from 'react-redux'

import moment from 'moment'

import * as searchAction from '../actions/search'

class Search extends Component{
    componentDidMount(){
        
        // this.props.dispatch(searchAction.searchManga('naru'))

        // search = await this.props.navigation.getParam('search')
        this.props.dispatch(searchAction.searchManga(this.props.navigation.getParam('search')))

    }
    
    componentWillUnmount(){
        this.props.dispatch({type:'RESET_SEARCH'})
    }

    handlePull = ()=>{
        this.props.dispatch(searchAction.searchManga(this.props.navigation.getParam('search')))
        
    }

    _keyExtractor = (item, index) => item.id

    _renderItem = ({item}) => (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress= {()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}
        >
            <View style={styles.descriptionWrapper}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        source={{uri: item.img}}
                        resizeMode="cover"
                    />
                    <View style = {styles.scoreWrapper}>
                        {/* <Text style={styles.scoreText}>Score</Text> */}
                        <View style={styles.scoreValueWrapper}>
                            <Text style={styles.scoreValueText}>{item.score}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.subDescription}>
                        <Text style={styles.subDescriptionText}>{moment(item.created).fromNow()},</Text>
                        <Text style={styles.subDescriptionText}> last chapter {item.chapter}</Text>
                    </View>
                    <Text numberOfLines={4} style={styles.synopsis}>{item.synopsis}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )

    render(){
        return(
            <View style={styles.mainWrapper}>
                <FlatList
                    refreshing = {this.props.searchReducer.isLoading}
                    onRefresh = {this.handlePull}
                    data={this.props.searchReducer.dataSearch}
                    extraData={this.props.searchReducer.dataSearch}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        searchReducer: state.searchReducer
    }
}

export default connect(mapStateToProps)(Search)

const styles = StyleSheet.create({
    descriptionWrapper: {
        flexDirection: 'row', 
        // flex:1,
        height: 160,
        padding: 10,
        // backgroundColor: 'red'
    },
    subDescription: {
        // justifyContent: 'space-between',
        flexDirection: 'row'
    },
    subDescriptionText:{
        fontSize: 12,
    },
    title: {
        color: '#121212'
    },
    description: {
        flex:1,
        paddingLeft: 10,
    },
    synopsis:{
        color: '#383838',
        fontSize: 13
    },
    mainWrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageWrapper: {
        width:110,
        height:140,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        overflow: 'hidden'
    },
    scoreWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 5
    },
    scoreValueWrapper:{
        width: 35,
        backgroundColor: '#F16334',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 10,
    },
    scoreValueText: {
        color:'white',
        fontSize: 12
    },
    scoreText: {
        fontSize: 12,
    },
})