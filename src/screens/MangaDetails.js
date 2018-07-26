import React,{Component} from 'react'
import {Text, View, StyleSheet, Dimensions, Image, BackAndroid} from 'react-native'
import {Content, Container, Button, Spinner} from 'native-base'
import {connect} from 'react-redux'

import * as mangaDetailsAction from '../actions/mangaDetails'

const screenWidth = Dimensions.get('window').width
const imgResize =  screenWidth/9*4/65.25

class Main extends Component{
    render(){
        return(
            <View style={styles.mainWrapper}>
                <View style={styles.mangaDetailsWrapper}>
                    <View style={styles.mangaDetails}>
                        <Image
                            style={styles.mangaDetailsImage}
                            source={{uri: this.props.img}}
                        />
                    </View>
                    <View style={{flex:5}}>
                        <Text style={styles.mangaDetailsName}>Name</Text>
                        <Text style={styles.mangaDetailsNameContent}>{this.props.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.mangaDetailsRanked}>Ranked #{this.props.ranked}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={styles.mangaDetailsPopularity}>Popularity #{this.props.popularity}</Text>
                            </View>
                        </View>
                        <View  style={styles.mangaDetailsScore}>
                            <Text style={styles.mangaDetailsScoreContent}>{this.props.score}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.mangaDetailsSource}>Source</Text>
                                <Text style={styles.mangaDetailsSourceContent}>Myanimelist</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={styles.mangaDetailsLastUpdate}>Last Update</Text>
                                <Text style={styles.mangaDetailsLastUpdateContent}>17 April</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.mangaDetailsBottom}>

                    <Content style={{padding: 10}}>
                        <View style={styles.mangaDetailsSynopsis}>
                            <View style={styles.mangaDetailsSynopsisDot}/>
                            <Text style={styles.mangaDetailsSynopsisTitle}>Synopsis</Text>
                        </View>
                        <Text style={{paddingBottom: 20}}>{this.props.synopsis}</Text>
                    </Content>

                    <Button full onPress={this.props.goChapterList} style={{backgroundColor: '#f16334'}}>
                        <Text style={{color: 'white'}}>Read now</Text>
                    </Button>

                </View>
            </View>

            
        )
    }
}

class MangaDetails extends Component{

    async componentDidMount(){
        BackAndroid.addEventListener('backPress', () => {
            this.props
            .dispatch({
              type: 'Navigation/BACK'
            })
            return true
        })

        id = await this.props.navigation.getParam('id')
        this.props.dispatch(mangaDetailsAction.getMangaDetails(id))
    }

    render(){
        return(
            <Container style={styles.mainWrapper}>

                {/* <Text>{JSON.stringify(this.props.mangaDetailsReducer)}</Text> */}
            
                {this.props.mangaDetailsReducer.isLoading == true ? (
                     <View style={styles.isLoading}>
                        <Spinner color='#f16334' />
                    </View>
                ): (
                    <Main 
                        img = {this.props.mangaDetailsReducer.manga.img}
                        title = {this.props.mangaDetailsReducer.manga.titleMal}
                        ranked = {this.props.mangaDetailsReducer.manga.ranked}
                        popularity = {this.props.mangaDetailsReducer.manga.popularity}
                        score = {this.props.mangaDetailsReducer.manga.score}
                        synopsis = {this.props.mangaDetailsReducer.manga.synopsis}
                        goChapterList = {()=>this.props.navigation.navigate('ChapterList')}
                    />
                )}                 
            </Container>
        )
    }
}

mapStateToProps = (state)=>{
    return{
        mangaDetailsReducer: state.mangaDetailsReducer
    }
}

export default connect(mapStateToProps)(MangaDetails)

const styles = StyleSheet.create({
    mainWrapper: {
        flex:1,
        backgroundColor: 'white'
    },
    isLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mangaDetailsWrapper: {
        flex: 3,
        flexDirection: 'row',
        padding:5
    },
    mangaDetails: {
        flex: 4,
        alignItems: 'center',
        justifyContent:'flex-start',
        paddingTop: 10
    },
    mangaDetailsImage: {
        width: imgResize*55, 
        height: imgResize*75,
        borderRadius: 8
    },
    mangaDetailsName: {
        fontSize: 12,
        color: '#989898',
        marginTop: 10

    },
    mangaDetailsNameContent: {
        color: '#121212',
        marginBottom: 10
    },
    mangaDetailsRanked: {
        fontSize: 12,
        color: '#989898'
    },
    mangaDetailsPopularity: {
        fontSize: 12,
        color: '#989898'
    },
    mangaDetailsScore: {
        backgroundColor: '#f16334',
        borderRadius: 50,
        width: 30,
        marginTop: 2,
        marginBottom: 10
    },
    mangaDetailsScoreContent: {
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
    mangaDetailsSource: {
        fontSize: 12,
        color: '#121212'
    },
    mangaDetailsSourceContent: {
        fontSize: 12,
        color: '#989898'
    },
    mangaDetailsLastUpdate: {
        fontSize: 12,
        color: '#121212'
    },
    mangaDetailsLastUpdateContent: {
        fontSize: 12,
        color: '#989898'
    },
    mangaDetailsBottom: {
        flex: 4,
        backgroundColor: '#f7f7f7'
    },
    mangaDetailsSynopsisTitle: {
        color: '#121212',
        marginLeft: 5
    },
    mangaDetailsSynopsisDot: {
        width: 7,
        height: 7,
        backgroundColor: '#f16334',
        borderRadius: 50
    },
    mangaDetailsSynopsis: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }
})