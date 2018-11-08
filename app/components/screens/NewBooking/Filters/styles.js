import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
  }
})

export const googleStyles = StyleSheet.create({
  locationItem: {
    marginBottom: 12
  },
  container: {
    // maxHeight: 100,
    elevation: 3,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 16
    // borderWidth: 2,
    // borderColor: colors.red
  },
  contentContainerStyle: {
    backgroundColor: '#fff'
  }
})
