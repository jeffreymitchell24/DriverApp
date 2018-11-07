import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  filterRow: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderColor: '#F1F3F5',
    borderBottomWidth: 1
  },
  fieldName: {
    fontSize: 17,
    fontFamily: 'SFProText-Regular',
    color: '#212529'
  },
  recurringImageContainer: {
    width: 24,
    height: 24
  }
})

export default styles
