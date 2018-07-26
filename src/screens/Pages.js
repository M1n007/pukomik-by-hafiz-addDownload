import React, { Component } from 'react'
import {Text,View,Image,Dimensions,StatusBar, Alert} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import GestureRecognizer from 'react-native-swipe-gestures';
import {connect} from 'react-redux'
import {setJSExceptionHandler} from 'react-native-exception-handler'

import {getPages} from '../actions/pages'

const { width } = Dimensions.get('window')
const loading = require('../assets/img/loading.gif')

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert('Unexpected error occurred','Maaf, terjadi kesalahan');
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler,true);

class Pages extends Component {

    state = {
        currentId: 0,
        chapter:0,
        loadQueue: [],
        page:{
            index: 1,
            total: 0
        }
    }

  async componentDidMount(){
    // alert(JSON.stringify(this.props.pagesReducer))
    this.setState({
      currentId: this.props.pagesReducer.pageList[0].chapter_id,
      chapter: this.props.pagesReducer.pageList[0].chapter
    })

    this.getTotalPage()
  }

  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1

    this.setState({
      loadQueue
    })
  }

  getTotalPage = ()=>{
    this.setState({
      page: {
        ...this.state.page,
        total: this.props.pagesReducer.pageList.length
      }
    })
  }

  onIndexChanged = (index)=>{
    this.setState({
      page: {
        ...this.state.page,
        index: index+1
      }
    })

  }

  getCurrentIndexId = ()=>{
    return this.props.chapterListReducer.data.findIndex(item => item.id == this.state.currentId)
  }

  nextChapter = ()=>{

    if(this.state.page.index == this.state.page.total){
      let nextChapter = this.props.chapterListReducer.data[this.getCurrentIndexId()-1]

      if(this.getCurrentIndexId() == 0){
        alert('Anda berada di ujung chapter')
      }
      else{
        this.setState({
          // currentId: nextChapter.id
        })

        this.props.dispatch(getPages(nextChapter.id))
        // this.getPages(nextChapter.id)
        // this.props.navigation.navigate('Pages',{id: nextChapter.id})
      }
    }
  }

  previousChapter = ()=>{
    // alert(this.getCurrentIndexId() != this.props.chapterListReducer.data.length - 1)
    // this.props.dispatch(getPages(81))

     if(this.state.page.index == 1){
      let previousChapter = this.props.chapterListReducer.data[this.getCurrentIndexId()+1]

      if(this.getCurrentIndexId() != this.props.chapterListReducer.data.length - 1){
       this.setState({
        //  currentId: previousChapter.id
       })
      //  this.getPages(previousChapter.id)
      this.props.dispatch(getPages(previousChapter.id))
      }

     }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true}  />
        <View style={styles.page}>
          {/* <Text style={{color:'white'}}>{JSON.stringify(this.state)}</Text> */}
          <Text style={styles.pageText}>{this.state.page.index}/{this.state.page.total} #{this.state.chapter}</Text>
        </View>
        <GestureRecognizer
          onSwipeLeft={this.nextChapter}
          onSwipeRight={this.previousChapter}
          style={{flex:1}}
        >
        <Swiper 
          showsPagination={false}
          loadMinimal 
          loadMinimalSize={1} 
          style={styles.wrapper} 
          loop={false}
          onIndexChanged = {(index)=>this.onIndexChanged(index)}
        >
          {
            this.props.pagesReducer.pageList.map((item, i) => (

              <View style={styles.slide}>
                  <PhotoView
                    source={{uri: item.image}}
                    minimumZoomScale={0.5}
                    maximumZoomScale={3}
                    androidScaleType="fitCenter"
                    onError = {()=>alert('onError')}
                    onLoad = {()=>this.loadHandle(i)}
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height
                    }} 
                  />
                  {
                    !!!this.state.loadQueue[i] && <View style={styles.loadingView}>
                      <Image style={styles.loadingImage} source={loading} />
                    </View>
                  }


              </View>
            ))
          }
        </Swiper>
        </GestureRecognizer>

      </View>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
        pagesReducer: state.pagesReducer,
        chapterListReducer: state.chapterListReducer
    }
}

export default connect(mapStateToProps)(Pages)

const styles = {
  wrapper: {
  },
  page: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    zIndex: 1,
    paddingLeft: 5,
    paddingRight:5
  },
  pageText: {
    color: 'white',
    fontSize: 12,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'white'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
}