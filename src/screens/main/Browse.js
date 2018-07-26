import React,{Component,PureComponent} from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ScrollView, FlatList} from 'react-native'
import {Toolbar,ThemeProvider} from 'react-native-material-ui'
import {Content,Container,Spinner} from 'native-base'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux';
import * as browseAction from '../../actions/browse'
import Modal from "react-native-modal";

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
    )

    render(){
        return( 
                <Content>
                    
                    {this.props.isLoading == true ? (
                        <Spinner color='#f16334' />
                    ): null}

                    <FlatList
                        contentContainerStyle = {styles.bodyWrapper}
                        data={this.props.data}
                        extraData={this.props.extraData}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns = {3}
                        columnWrapperStyle = {
                            {justifyContent: 'space-around'}
                        }
                    />
                </Content>
        )
    }
}

class Browse extends Component{

    state = {
        filter: false,
        isSearch: false,
        search:''
    }


    componentDidMount(){
        this.props.dispatch(browseAction.getMangas(0,rows)).then(()=>{
            this.setState({
                filter: true
            })
        })
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

    handleSearch = ()=>{
        this.props.dispatch(browseAction.searchManga(this.state.search))
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

    render(){
        return(
            <Container style={{flex:1,backgroundColor: 'white'}}>
                    <Toolbar
                        centerElement='pukomik.com'
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                            onChangeText: (search)=>this.setState({search}),
                            onSearchPressed: ()=>this.setState({isSearch: true,filter: false}),
                            onSearchClosed: ()=>this.setState({isSearch: false,filter: true}),
                            onSubmitEditing: this.handleSearch
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

                    {this.state.filter == true ? (
                        <Animatable.View animation="fadeInUp" iterationCount={1} style={styles.filterWrappper}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={()=>alert('handle filter')}
                            >
                                <View style={styles.filterItem}>
                                    <Text style={styles.filterText}>Filter</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={{height: 20,width: 2, backgroundColor:'#e8e8e8'}}/>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={()=>alert('handle sor by')}
                            >
                                <View style={styles.filterItem}>
                                    <Text style={styles.filterText}>Sort by</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </Animatable.View>
                    ): null}



                    {/* isSearch */}
                    {this.state.isSearch == true ?(
                        <Animatable.View animation="" style={styles.searchWrapper}>
                            <BrowseSearch
                                isLoading = {this.props.browseReducer.isLoading}
                                data = {this.props.browseReducer.dataSearch}
                                extraData = {this.props.browseReducer.dataSearch}
                                navigation = {this.props.navigation}
                            />
                        </Animatable.View>

                    ): null}

                    {/* sort by */}
                    <Modal isVisible={true}>
                        <View style={{ flex: 1 }}>
                            <Text>I am the modal content!</Text>
                        </View>
                    </Modal>
                    
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
        top: 54,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        zIndex:1
    },
    categoryWrapper: {
        flex:1,
        padding: 10
    },
    allMangaText: {
        color: '#444444'
    },
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
        position: 'absolute',
        zIndex: 1,
        bottom:0,
        width: '100%',
        // left: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 40,
    },
    filterItem: {
        width: '50%',
        padding: 10,
        alignItems: 'center'
    },
    filterText: {
        color: '#757575'
    }
})