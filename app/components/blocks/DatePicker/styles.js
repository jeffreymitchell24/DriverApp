import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#F1F3F5',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'SFProText-Regular',
    color: '#212529'
  },
  headerDisabledText: {
    fontSize: 17,
    fontFamily: 'SFProText-Regular',
    color: '#868E96'
  },
  headerDate: {
    fontSize: 17,
    fontFamily: 'Helvetica',
    color: '#F03E3E'
  }
})
