import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TouchableNativeFeedback,ScrollView} from 'react-native'

const screenWidth = Dimensions.get('window').width
const arr = [1,2,3,4,5,6,7]
export default class extends Component{

    getRowTotal = (totalData, width)=>{
        res = Math.floor(screenWidth/width)
        resMod = totalData%res
        return res - resMod
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor: 'white'}}>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={styles.filterWrappper}>
                        <Text style={styles.filterText}>Filter</Text>
                    </View>
                </TouchableNativeFeedback>
                
                <ScrollView>
                {/* <Text>{this.getRowTotal(4,110)}</Text> */}
                
                <View style={styles.categoryWrapper}>

                    <Text style={styles.allMangaText}>ALL MANGA</Text>
                    <View style={styles.bodyWrapper}>


                    {arr.map(()=>{
                    return (
                        <View style={styles.listWrapper}>
                            <View style={styles.imageWrapper}>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    height: 140,
                                    width: 110,
                                }}
                                source={{uri:'https://myanimelist.cdn-dena.com/images/anime/1173/92110.jpg'}}
                                resizeMode="stretch"
                                />
                            </View>
                            <Text numberOfLines={1} style={styles.mangaTitle}>Shingeki no Kyojin Season 3</Text>
                            <View style = {styles.scoreWrapper}>
                                <Text style={styles.scoreText}>Score</Text>
                                <View style={styles.scoreValueWrapper}>
                                    <Text style={styles.scoreValueText}>9.7</Text>
                                </View>
                            </View>
                            <Text style={styles.lChapterText}>Last Chapter #212</Text>
                        </View>
                    )
                    })}
                    </View>

                    
                </View>
                </ScrollView>
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    categoryWrapper: {
        flex:1,
        padding: 10
    },
    allMangaText: {
        color: '#444444'
    },
    bodyWrapper: {
        flex :1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
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
        zIndex: 1,
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