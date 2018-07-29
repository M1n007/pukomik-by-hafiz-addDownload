import React,{Component,PureComponent} from 'react'
import {View,Text,StyleSheet,Image,TouchableNativeFeedback, FlatList,AsyncStorage} from 'react-native'
import {Toolbar} from 'react-native-material-ui'
import {Content,Container,Spinner,Button,Icon} from 'native-base'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux';
import * as browseAction from '../../actions/browse'
import Modal from "react-native-modal";
import moment from 'moment'

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
            <View style = {styles.scoreWrapper}>
                {/* <Text style={styles.scoreText}>Score</Text> */}
                <View style={styles.scoreValueWrapper}>
                    <Text style={styles.scoreValueText}>{this.props.score}</Text>
                </View>
            </View>
            </View>
            <Text numberOfLines={1} style={styles.mangaTitle}>{this.props.title}</Text>
            
            <Text style={styles.lChapterText}>Last Chapter {this.props.lastChapter}</Text>
            <Text style={styles.lChapterText}>{moment(this.props.created).fromNow()}</Text>
        </View>
        </TouchableNativeFeedback>
        )
    }
}

// class BrowseSearch extends PureComponent{

//     _keyExtractor = (item, index) => item.id

//     _renderItem = ({item}) => (
//         <Manga
//             img = {item.img}
//             title = {item.title}
//             score = {item.score}
//             lastChapter = {item.chapter}
//             created = {item.created}
//             onPress={()=>this.props.navigation.navigate('MangaDetails',{id: item.id})}
//         />
//     )
 
//     render(){
//         return( 
//                 <Content>
                    
//                     {this.props.isLoading == true ? (
//                         <Spinner color='#f16334' />
//                     ): null}

//                     <FlatList
//                         contentContainerStyle = {styles.bodyWrapper}
//                         data={this.props.data}
//                         extraData={this.props.extraData}
//                         keyExtractor={this._keyExtractor}
//                         renderItem={this._renderItem}
//                         numColumns = {3}
//                         columnWrapperStyle = {
//                             {justifyContent: 'space-around'}
//                         }
//                     />
//                 </Content>
//         )
//     }
// }

class Browse extends Component{

    state = {
        filterButton: false,
        filter: {
            sortBy: 'A - Z',
        },
        // isSearch: false,
        search:'',
        modal: {
            filter: false,
            sortBy:false
        }
    }


    componentDidMount(){
        this.props.dispatch(browseAction.getMangas(0,rows,this.state.filter.sortBy)).then(()=>{
            this.setState({
                filterButton: true
            })

            // alert(JSON.stringify(this.props.browseReducer))
        })
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('mangaBookmarks')
          if (value !== null) {
            this.props.dispatch({
                type: 'PUSH_BOOKMARK',
                payload: {
                    bookmarks: JSON.parse(value)
                }
            })
          }
         } catch (error) {
            alert(error)
         }
      }

    async getReset(){
        await this.props.dispatch({type: 'GET_MANGAS_RESET'})
        this.props.dispatch(browseAction.getMangas(0,rows,this.state.filter.sortBy))
    }

    handleOnPull = ()=>{
        this.getReset()
    }

    handleOnReach = ()=>{
        this.props.dispatch(browseAction.getMangas(this.props.browseReducer.startPage,rows,this.state.filter.sortBy))
    }

    // handleSearch = ()=>{
    //     this.props.dispatch(browseAction.searchManga(this.state.search))
    // }

    handleModal = (type)=>{
        if(type =='filter'){
            this.setState({
                modal: {
                    ...this.state.modal,
                    filter: !this.state.modal.filter
                }
            })
        }
        if(type =='sortBy'){
            this.setState({
                modal: {
                    ...this.state.modal,
                    sortBy: !this.state.modal.sortBy
                }
            })
        }
    }
    
    handleSortBy = (sortBy, type)=>{
        this.setState({
            filter: {
                sortBy
            }
        })
        this.handleModal(type)
        this.getReset()
    }
    
    

    _keyExtractor = (item, index) => item.id

    _renderItem = ({item}) => (
        <Manga
            img = {item.img}
            title = {item.title}
            score = {item.score}
            lastChapter = {item.chapter}
            created = {item.created}
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
                            // onSearchPressed: ()=>this.setState({isSearch: true,filterButton: false}),
                            // onSearchPressed: ()=>this.props.navigation.navigate('Search',{search: this.state.search}),
                            // onSearchClosed: ()=>this.setState({isSearch: false,filterButton: true}),
                            onSubmitEditing: ()=>this.props.navigation.navigate('Search',{search: this.state.search})
                        }}
                        rightElement={{
                            menu: {
                                icon: "more-vert",
                                labels: ["About"]
                            }
                        }}
                        style = {{
                            container: {
                                backgroundColor: '#f16334'
                            }
                        }}
                        onRightElementPress={ (label) => alert('Created by Jondes @haffjjj')}
                    />

                    {this.state.filterButton == true ? (
                        <Animatable.View animation="fadeInUp" iterationCount={1} style={styles.filterWrappper}>
                            {/* <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={()=>alert('handle filter')}
                            >
                                <View style={styles.filterItem}>
                                    <Text style={styles.filterText}>Filter</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={{height: 20,width: 2, backgroundColor:'#e8e8e8'}}/> */}
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={()=>this.handleModal('sortBy')}
                            >
                                <View style={styles.filterItem}>
                                    {this.state.filter.sortBy == null ? (
                                        <Text style={styles.filterText}>Sort by</Text>
                                    ) : (
                                        <View style={styles.filterSortByValueWrapper}>
                                            <Icon name='md-checkmark-circle' style={styles.filterSortByValue}/>
                                            <Text style={styles.filterTextBold}>{this.state.filter.sortBy}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableNativeFeedback>
                        </Animatable.View>
                    ): null}

                    {/* <Text>{JSON.stringify(this.state.filter.sortBy)}</Text> */}

                    {/* isSearch */}
                    {/* {this.state.isSearch == true ?(
                        <Animatable.View animation="" style={styles.searchWrapper}>
                            <BrowseSearch
                                isLoading = {this.props.browseReducer.isLoading}
                                data = {this.props.browseReducer.dataSearch}
                                extraData = {this.props.browseReducer.dataSearch}
                                navigation = {this.props.navigation}
                            />
                        </Animatable.View>

                    ): null} */}

                    {/* sort by */}
                    <Modal 
                        isVisible={this.state.modal.sortBy}
                        onBackButtonPress = {()=>this.handleModal('sortBy')}
                    >
                        <View style={styles.modalWrapper}>
                            <View style={styles.modalItem}>
                                <Button style={{backgroundColor: 'white'}} onPress={()=>this.handleSortBy('A - Z','sortBy')} full>
                                    <Text style={{color:'#515151'}}>A - Z</Text>
                                </Button>
                                <Button style={{backgroundColor: 'white'}} onPress={()=>this.handleSortBy('Z - A','sortBy')} full>
                                    <Text style={{color:'#515151'}}>Z - A</Text>
                                </Button>
                                {/* <Button style={{backgroundColor: 'white'}} onPress={()=>this.handleSortBy('Last Update','sortBy')} full>
                                    <Text style={{color:'#515151'}}>Last Update</Text>
                                </Button> */}
                                <Button style={{backgroundColor: 'white'}} onPress={()=>this.handleSortBy('Score','sortBy')} full>
                                    <Text style={{color:'#515151'}}>Score</Text>
                                </Button>
                                <Button style={{backgroundColor: 'white'}} onPress={()=>this.handleSortBy('Last Update','sortBy')} full>
                                    <Text style={{color:'#515151'}}>Last Update</Text>
                                </Button>
                            </View>
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
    modalItem: {
        width: 200,
        // height: 200,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden'
    },
    modalWrapper: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
     },
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
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        overflow: 'hidden'
    },
    mangaTitle: {
        color: '#121212'
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
    lChapterText:{
        fontSize: 12
    },
    filterWrappper: {
        position: 'absolute',
        zIndex: 1,
        bottom:10,
        // width: '100%',
        width: '100%',
        // left: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'white',
        elevation: 40,
    },
    filterItem: {
        // width: '50%',
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 20,

    },
    filterText: {
        color: '#515151'
    },
    filterTextBold: {
        color: '#515151',
        fontWeight: 'bold',
    },
    filterSortByValueWrapper: {
        flexDirection:'row',
        alignItems: 'center'
    },
    filterSortByValue: {
        fontSize: 13,
        marginRight: 5,
        color:'#F16334'
    }
})