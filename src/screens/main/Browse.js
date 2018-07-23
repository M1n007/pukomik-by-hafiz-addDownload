import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, Image,View, Dimensions, StatusBar, AsyncStorage, TouchableNativeFeedback, BackAndroid,Linking} from 'react-native'
import {Container,ListItem, Body, Icon, Spinner} from 'native-base'
import { connect } from 'react-redux';


import * as browseAction from '../../actions/browse'

const screenWidth = Dimensions.get('window').width
const imgResize = screenWidth/65.25
const rows = 5

class Browse extends Component{

    componentDidMount(){
        this.props.dispatch(browseAction.getMangas(0,rows))
    }

    async getReset(){
        await this.props.dispatch({type: 'GET_MANGAS_RESET'})
        this.props.dispatch(browseAction.getMangas(0,rows))
    }

    handleOnPull = ()=>{
        this.getReset()
    }

    handleOnReach = ()=>{
        this.props.dispatch(browseAction.getMangas(this.props.browseReducer.startPage,rows))
    }

    _keyExtractor = (item, index) => item.id

    _onPressItem = () => {
        alert('list onpress')
    }

    _renderItem = ({item}) => (
        <ListItem onPress={()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}>
            <Body>
                <View style={styles.listWrapper}>

                    <View style={styles.listItem}>
                        <Image
                            style={styles.listImage}
                            source={{uri: item.img}}
                        />
                        <View style={styles.listItemContent}>
                            <Text style={styles.listItemTitle}>{item.title}</Text>
                            <View  style={styles.listItemScoreWrapper}>
                                <Text style={styles.listItemScore}>{item.score}</Text>
                            </View>
                            <Text style={styles.listItemPopularity}>Popularity #{item.popularity}</Text>
                            <Text style={styles.listItemRanked}>Ranked #{item.ranked}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.listItemBookmark}>  
                        {/* <TouchableNativeFeedback
                            // onPress={}
                            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>

                            <View style={styles.listItemBookmarkIconWrapper}>
                                <Icon style={styles.listItemBookmarkIcon}  name='ios-heart' />
                            </View>
                            
                        </TouchableNativeFeedback> */}
                    </View>


                </View>
            </Body>
        </ListItem>
    )

    render(){
        return(
            <Container style={styles.mainWrapper}>

                {/* <Text>{JSON.stringify(this.props.browseReducer)}</Text> */}

                <FlatList
                    refreshing = {this.props.browseReducer.isLoading}
                    onRefresh = {this.handleOnPull}
                    onEndReachedThreshold = {0.5}
                    onEndReached = {this.handleOnReach}
                    data={this.props.browseReducer.data}
                    extraData={this.props.browseReducer}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this.listEmptyData}
                    ListFooterComponent={this.listFooterComponent}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        browseReducer: state.browseReducer
    }
}

export default connect(mapStateToProps)(Browse)

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: 'white'
    },
    listWrapper:{
        flex: 1,
        flexDirection: 'row'
    },
    listItem:{
        flex: 5, 
        flexDirection: 'row',
        paddingRight:10
    },
    listImage: {
        width: imgResize*20, 
        height: imgResize*30,
        borderRadius: 8
    },
    listItemContent: {
        paddingLeft: 10,
        paddingRight: 20,
    },
    listItemTitle: {
        color: '#121212'
    },
    listItemScoreWrapper: {
        backgroundColor: '#f16334',
        borderRadius: 50,
        width: 35,
        marginTop: 2,
        marginBottom: 10
    },
    listItemScore: {
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
    listItemPopularity: {
        fontSize: 12,
        color: '#878787'
    },
    listItemRanked:{
        fontSize: 12,
        color: '#878787'
    },
    listItemBookmark: {
        alignSelf: 'center',
        flex: 1
    },
    listItemBookmarkIconWrapper:{
        width:25,
        height:25,
        alignItems:'center',
        justifyContent:'center'
    },
    listItemBookmarkIcon:{
        color: 'red',
        fontSize: 15
    },
    noDataWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#f4f4f4',
        borderRadius: 50,
        margin: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15
    }
})