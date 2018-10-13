import {RideMalfunction, RideDamaged, RideAccident, BookingDetail, RideCancel} from 'navigation/routeNames'

export default [
  {
    id: 'malfunction',
    text: 'Car malfunctioned',
    routeName: RideMalfunction
  },
  {
    id: 'damaged',
    text: 'Car is damaged',
    routeName: RideDamaged
  },
  {
    id: 'accident',
    text: 'I had an accident',
    routeName: RideAccident
  },
  {
    id: 'late',
    text: 'I’m late',
    routeName: BookingDetail
  },
  {
    id: 'cancel',
    text: 'I need to cancel my booking',
    routeName: RideCancel
  }
]
