import React,{Component,PureComponent} from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ScrollView, FlatList} from 'react-native'
import {Toolbar,ThemeProvider} from 'react-native-material-ui'
import {Content,Container} from 'native-base'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux';
import * as browseAction from '../actions/browse'

const rows = 15

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
                    alignSelf: 'center',
                    height: 140,
                    width: 110,
                }}
                source={{uri: this.props.img}}
                resizeMode="stretch"
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

class BrowseSearch extends PureComponent{

    _keyExtractor = (item, index) => item.id

    _renderItem = ({item}) => (
        <Manga
            img = {item.img}
            title = {item.title}
            score = {item.score}
            popularity = {item.popularity}
            onPress={()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}
        />
        // </TouchableNativeFeedback>
    )

    render(){
        return(
            <Container>
                <FlatList
                        contentContainerStyle = {styles.bodyWrapper}
                        refreshing = {this.props.isLoading}
                        data={this.props.data}
                        extraData={this.props.extraData}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns = {3}
                        columnWrapperStyle = {
                            {justifyContent: 'space-around'}
                        }
                    />
            </Container>
        )
    }
}

class Browse extends Component{

    state = {
        scrollIndex:0,
        filter: true,
        isSearch: false,
    }


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

    _renderItem = ({item}) => (
        <Manga
            img = {item.img}
            title = {item.title}
            score = {item.score}
            popularity = {item.popularity}
            onPress={()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}
        />
        // </TouchableNativeFeedback>
    )

    render(){
        return(
            <Container style={{flex:1,backgroundColor: 'white'}}>
                    <Toolbar
                        centerElement='pukomik.com'
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                            // onChangeText: (search)=>this.setState({search}),
                            onSearchPressed: ()=>this.setState({isSearch: true}),
                            onSearchClosed: ()=>this.setState({isSearch: false}),
                            // onSubmitEditing: this.handleSearch
                        }}
                        rightElement={{
                            menu: {
                                icon: "more-vert",
                                labels: ["About","Settings"]
                            }
                        }}
                        style = {{
                            container: {
                                backgroundColor: '#f16334'
                            }
                        }}
                        onRightElementPress={ (label) => { alert(JSON.stringify(label)) }}
                    />

                    {/* isSearch */}
                    {this.state.isSearch == true ?(
                        <Animatable.View animation="" style={styles.searchWrapper}>
                            <BrowseSearch
                                isLoading = {this.props.browseReducer.isLoading}
                                data = {this.props.browseReducer.data}
                                extraData = {this.props.browseReducer.data}
                            />
                        </Animatable.View>

                    ): null}

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                    >
                        <Animatable.View animation="zoomIn" iterationCount={1} style={styles.filterWrappper}>
                            <Text style={styles.filterText}>Sort by</Text>
                        </Animatable.View>
                    </TouchableNativeFeedback>

                    
                    <FlatList
                        contentContainerStyle = {styles.bodyWrapper}
                        refreshing = {this.props.browseReducer.isLoading}
                        onRefresh = {this.handleOnPull}
                        onEndReachedThreshold ={0.5}
                        onEndReached = {this.handleOnReach}
                        data={this.props.browseReducer.data}
                        extraData={this.props.browseReducer.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns = {3}
                        columnWrapperStyle = {
                        {justifyContent: 'space-around'}
                        }
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
    searchWrapper: {
        height: '100%',
        width: '100%',
        zIndex: 20,
        backgroundColor:'white'
    },
    categoryWrapper: {
        flex:1,
        padding: 10
    },
    allMangaText: {
        color: '#444444'
    },
    bodyWrapper: {
        // flex :1,
        backgroundColor: 'white',
        flexDirection: 'column',
        // alignItems: 'space-around',
        // flexWrap: 'wrap',
        paddingTop: 10
        // padding: 10

    },
    listWrapper: {
        height: 205,
        width:110,
        borderRadius: 5,
        overflow: 'hidden',
        // backgroundColor: 'red',
    },
    imageWrapper: {
        width:110,
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
        width: 30,
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
    filterWrappper: {
        width: 76,
        height: 30,
        zIndex: 0,
        position: 'absolute',
        bottom: 10,
        left: '50%',
        marginLeft: -38,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
          
    },
    filterText: {
        color: '#757575'
    }
})