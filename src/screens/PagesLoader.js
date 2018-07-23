import React,{Component} from 'react'
import {View,Text, StyleSheet,StatusBar} from 'react-native'
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
                <StatusBar hidden={true}  />

                {this.props.pagesReducer.isCompleted == true ? (
                    <Pages chapterId={this.props.navigation.getParam('id')} />
                ):(
                    <View style={styles.loadingWrapper}>
                        <Text>Loading.. Bosq</Text>
                    </View>
                )}
                {/* <Text>{JSON.stringify(this.props.pagesReducer)}</Text> */}
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

const styles = StyleSheet.create({
    loadingWrapper: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})