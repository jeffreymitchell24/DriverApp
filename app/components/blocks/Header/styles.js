
import {StyleSheet} from 'react-native'
import { metrics } from 'theme'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    padding: metrics.screenWidth * 0.04,
    backgroundColor: '#fff'
  },
  headerLeftIconContainer: {
    position: 'absolute',
    left: 10
  },
  headerIcon: {
    fontSize: metrics.screenWidth * 0.05,
    color: 'rgb(222,71,71)'
  },
  headerText: {
    fontSize: metrics.screenWidth * 0.045,
    color: '#000',
    textAlign: 'center',
    flex: 1
  }
})
