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

export const getCurrentDateAndTime = () => {
  let currentDate = moment()
  let time = currentDate.format('HH:mm')
  let date = currentDate.format('MM/DD/YYYY')
  return {time, date}
}

export const formatDate = date => {
  let currentDate = moment(date)
  return currentDate.format('MM/DD/YYYY')
}
export const formatTime = (date) => {
  let currentDate = moment(date)
  return currentDate.format('HH:mm')
}

export const tempDates = () => {
  let tempStart = moment().set({'hours': 9, 'minutes': 0})
  let tempEnd = moment().set({'hours': 17, 'minutes': 0})
  let startTime = {
    timestamp: tempStart.unix(),
    label: tempStart.format('hh:mm A')
  }
  let endTime = {
    timestamp: tempEnd.unix(),
    label: tempEnd.format('hh:mm A')
  }

  return {startTime, endTime}
}
