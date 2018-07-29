import React from 'react'
import {Icon} from 'native-base'
import {createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import * as Screens from '../screens/index.js'


const Main = createBottomTabNavigator({
    tabMain: {
        screen: createStackNavigator({
            mainBrowse: {
                screen: Screens.Browse,
                navigationOptions: {
                    // headerTintColor: 'white',
                    // headerStyle: {
                    //     backgroundColor: '#f16334'
                    // },
                    // title: 'Pukomik.com',
                    header: null

                }
            }
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => {
              return <Icon name="md-browsers" style={{
                color: focused == true ? '#f16334' : '#e0e0e0'
              }}/>
            }
        },
    },
    tabBookmark: {
        screen: createStackNavigator({
            mainBookmark: {
                screen: Screens.Bookmarks,
                navigationOptions: {
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#f16334'
                    },
                    title: 'Bookmark',
                }
            }
        }),
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="md-bookmark" style={{
                color: focused == true ? '#f16334' : '#e0e0e0'
              }}/>
            }
        }
    },
    // tabDownloads: {
    //     screen: createStackNavigator({
    //         mainBookmark: {
    //             screen: Screens.Downloads,
    //             navigationOptions: {
    //                 headerTintColor: 'white',
    //                 headerStyle: {
    //                     backgroundColor: '#f16334'
    //                 },
    //                 title: 'Download',
    //             }
    //         }
    //     }),
    //     navigationOptions: {
    //         tabBarIcon: ({focused, tintColor}) => {
    //           return <Icon name="md-cloud-download" style={{
    //             color: focused == true ? '#f16334' : '#e0e0e0'
    //           }}/>
    //         }
    //     }
    // }
},
{
    tabBarOptions: {
        showLabel: false,
    }
      
})

const RootNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Search: {
        screen: Screens.Search,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f16334'
            },
        }
    },
    MangaDetails: {
        screen: Screens.MangaDetails,
        navigationOptions: {
            title: 'Manga Details',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f16334'
            },
        }
    },
    ChapterList: {
        screen: Screens.ChapterList,
        navigationOptions: {
            title: 'Chapter List',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f16334'
            },
        }
    },
    PagesLoader: {
        screen: Screens.PagesLoader,
        navigationOptions: {
            header: null
        }
    },
    Pages: {
        screen: Screens.Pages,
        navigationOptions: {
            header: null
        }
    },
    Search: {
        screen: Screens.Search,
        navigationOptions: {
            title: 'Search',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f16334'
            },
        }
    },
}, {
    // headerMode: 'none',
})

export default RootNavigator