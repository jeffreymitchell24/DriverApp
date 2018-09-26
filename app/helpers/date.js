import moment from 'moment'

export const getNext24hours = () => {
  let hours = []
  let nextHourNum = moment().hour() + 1
  let nextHour = moment(`${nextHourNum}:00`, 'HH:mm')

  for (let i = 0; i < 25; ++i) {
    hours.push({
      label: nextHour.format('hh:mm A'),
      value: nextHourNum++
    })
    nextHour.add(1, 'h')
  }
  return hours
}

export const isBetweenLimits = (start, end, time) => {
  let startHour = start
  let endHour = end
  if (endHour > startHour) {
    endHour += 12
  }
  console.log(startHour, endHour)
  let isBetween = time > start && time < end
  console.log('isBetween', isBetween)
  return isBetween
}
