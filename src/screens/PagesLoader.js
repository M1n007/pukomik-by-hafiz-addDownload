import React,{Component} from 'react'
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import {getPages} from '../actions/pages'
import Pages from './Pages'

class PagesLoader extends Component{
    componentDidMount(){

        this.props.dispatch(getPages(this.props.navigation.getParam('id')))
    }

    render(){
        return (
            <View style={{flex:1}}>
                {this.props.pagesReducer.isCompleted == true ? (
                    <Pages chapterId={this.props.navigation.getParam('id')} />
                ):(
                    <Text>Loading..</Text>
                )}
                {/* <Text>{JSON.stringify(this.props.pagesReducer.isCompleted)}</Text> */}
            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        pagesReducer: state.pagesReducer,
    }
}

export default connect(mapStateToProps)(PagesLoader)