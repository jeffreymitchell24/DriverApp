import { StyleSheet } from 'react-native'
import { colors } from 'theme'

export const styles = StyleSheet.create({
  container: {

    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  filterRow: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderColor: '#F1F3F5',
    borderBottomWidth: 1,
    paddingVertical: 12
  },
  fieldName: {
    fontSize: 17,
    fontFamily: 'SFProText-Regular',
    color: '#212529'
  },
  fieldValue: {
    fontSize: 17,
    fontFamily: 'Helvetica',
    color: '#868E96'
  },
  recurringImageContainer: {
    width: 24,
    height: 24
  },
  spinnerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
