import React,{Component} from 'react'
import {Text,View, FlatList,TouchableNativeFeedback,StyleSheet} from 'react-native'
import {Container, ListItem, Body, Right, Button, Icon, Spinner} from 'native-base'
import Modal from "react-native-modal"
import {connect} from 'react-redux'

import {getChapterList} from '../actions/chapterList'

class ChapterList extends Component{

    componentDidMount(){
        this.props.dispatch(getChapterList(this.props.mangaDetailsReducer.manga.id))
        // this.props.dispatch(getChapterList(80))
    }

    componentWillUnmount(){
        this.props.dispatch({type:'RESET_CHAPTER_LIST'})
    }

    handleOnPull = ()=>{
        this.props.dispatch(getChapterList(this.props.mangaDetailsReducer.manga.id))
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={()=>this.props.navigation.navigate('PagesLoader',{id: item.id})}>
            <Body>
                <Text style={{color: '#121212'}}>Chapter #{item.chapter}</Text>
                <Text style={styles.chapterTitle}>{item.title}</Text>
            </Body>
            {/* <Right>
                <Button transparent onPress={()=>this.handleModal(true)}>
                    <Icon style={{color: '#f16334'}} name='md-cloud-download' />
                </Button>
            </Right> */}
        </ListItem>
    )

    handleModal = ()=>{
        this.props.dispatch({type: 'MODAL_ACTION'})
    }

    render(){
        return(
            <Container style={{backgroundColor: 'white'}}>
                <Modal isVisible={this.props.chapterListReducer.modal}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalMain}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <TouchableNativeFeedback
                                    onPress={()=>this.handleModal(false)}
                                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                                    <Icon style={styles.modalIcon} name='close' />
                                </TouchableNativeFeedback>
                            </View>
                            <Text style={{color: '#121212'}}>Coming soon bosqu</Text>
                            <Text>Please Wait..</Text>
                            <Spinner color='#568BF2' />
                            <Text style={{marginTop: 10}}>Downloading 1/20..</Text>    
                        </View>

                    </View>
                </Modal>

                {/* <Text>{JSON.stringify(this.props.chapterListReducer)}</Text> */}

                <View style={styles.mangaTitle}>
                    <Text style={styles.mangaTitleText}>{this.props.mangaDetailsReducer.manga.title}</Text>
                </View>

                <FlatList
                    refreshing = {this.props.chapterListReducer.isLoading}
                    onRefresh = {this.handleOnPull}
                    onEndReachedThreshold = {0.1}
                    // onEndReached = {() =>alert('end reach')}
                    data={this.props.chapterListReducer.data}
                    // extraData={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

            </Container>
        )
    }
}

mapStateToProps = (state)=>{
    return {
        chapterListReducer: state.chapterListReducer,
        mangaDetailsReducer: state.mangaDetailsReducer
    }
}

export default connect(mapStateToProps)(ChapterList)

styles = StyleSheet.create({
    chapterTitle: {
        color: '#878787',
        fontSize: 12
    },
    modalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalMain: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems:'center'
    },
    modalIcon: {
        fontSize: 20,
        color: '#878787'
    },
    mangaTitle: {
        backgroundColor: '#FAFAFA',
        padding: 6
    },
    mangaTitleText: {
        fontSize: 12,
        textAlign: 'center'
    }
})