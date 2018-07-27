import React,{Component,PureComponent} from 'react'
import {Text,StyleSheet,FlatList,TouchableNativeFeedback,Image,View} from 'react-native'
import {Container} from 'native-base'
import {connect} from 'react-redux'

import * as bookmarkAction from '../../actions/bookmarks'

class Manga extends PureComponent{
    render(){
        return(
            
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={this.props.onPress}
        >
        <View style={styles.listWrapper}>
            <View style={styles.imageWrapper}>
            <Image
                style={{
                    height: '100%',
                    width: '100%',
                }}
                source={{uri: this.props.img}}
                resizeMode="cover"
                />
            </View>
            <Text numberOfLines={1} style={styles.mangaTitle}>{this.props.title}</Text>
            <View style = {styles.scoreWrapper}>
                <Text style={styles.scoreText}>Score</Text>
                <View style={styles.scoreValueWrapper}>
                    <Text style={styles.scoreValueText}>{this.props.score}</Text>
                </View>
            </View>
            <Text style={styles.lChapterText}>Popularity #{this.props.popularity}</Text>
        </View>
        </TouchableNativeFeedback>
        )
    }
}


class Bookmarks extends Component{
    componentDidMount = ()=>{
        this.props.dispatch(bookmarkAction.getMangaIn(this.props.bookmarksReducer.bookmarks))
    }

    _keyExtractor = (item, index) => item.id

    _renderItem = ({item}) => (
        <Manga
            img = {item.img}
            title = {item.title}
            score = {item.score}
            popularity = {item.popularity}
            onPress={()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}
        />
    )

    handleOnPull = ()=>{
        this.props.dispatch(bookmarkAction.getMangaIn(this.props.bookmarksReducer.bookmarks))
    }

    render(){
        return(
            // <Text>{JSON.stringify(this.props.bookmarksReducer.data)}</Text>
            // <Container>
                <FlatList
                        style={{backgroundColor: 'white'}}
                        contentContainerStyle = {styles.bodyWrapper}
                        refreshing = {this.props.bookmarksReducer.isLoading}
                        onRefresh = {this.handleOnPull}
                        // onEndReachedThreshold ={0.5}
                        // onEndReached = {this.handleOnReach}
                        data={this.props.bookmarksReducer.data}
                        extraData={this.props.bookmarksReducer.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns = {3}
                        columnWrapperStyle = {
                            {justifyContent: 'space-around'}
                        }
                    />
            // </Container>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        bookmarksReducer: state.bookmarksReducer
    }
}

export default connect(mapStateToProps)(Bookmarks)

const styles = StyleSheet.create({
    bodyWrapper: {
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingTop: 10
    },
    listWrapper: {
        height: 200,
        width:110,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 5,
        margin: 5
    },
    imageWrapper: {
        width:'100%',
        height:140,
        backgroundColor: '#f2f2f2'
    },
    mangaTitle: {
        color: '#121212'
    },
    scoreWrapper: {
        flexDirection: 'row',
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
    lChapterText:{
        fontSize: 12
    },
})

