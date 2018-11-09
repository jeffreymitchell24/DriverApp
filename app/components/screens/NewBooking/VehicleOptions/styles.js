import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  resultsContainer: {
    marginVertical: 20
  },
  listHeader: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: '#495057'
  },
  resultsListContainer: {
    borderColor: '#F1F3F5',
    borderTopWidth: 1
  },
  resultRow: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomBorder: {
    borderColor: '#F1F3F5',
    borderBottomWidth: 1
  },
  resultRowText: {
    color: '#212529',
    fontSize: 18,
    fontFamily: 'Helvetica'
  }
})
