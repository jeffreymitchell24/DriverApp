import moment from 'moment'
import forEach from 'lodash/forEach'

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

export const get24hours = (date) => {
  const start = moment(date).set({'hours': 0, 'minutes': 0})
  const end = moment(date).set({'hours': 23, 'minutes': 59})
  const range = moment.range(start, end)
  const hours = Array.from(range.by('hour'))
  return hours.map(m => m.format('HH:mm'))
}

export const getCurrentDayHours = () => {
  const start = moment().set({'minutes': 0}).add(1, 'h')
  const end = moment().set({'hours': 23, 'minutes': 59})
  const range = moment.range(start, end)
  const hours = Array.from(range.by('hour'))
  return hours.map(m => m.format('HH:mm'))
}

export const getDisabledDays = (bookedHours) => {
  let disabledDays = {}
  forEach(bookedHours, (value, key) => {
    if (value === false) disabledDays[key] = {disabled: true, disableTouchEvent: true}
  })

  return disabledDays
}

export const getMaxDate = (startDate, bookedHours) => {
  let startTime = moment.unix(startDate.timestamp)
  let startHour = startTime.hour()
  if (startHour === 23) {
    return startTime.add(1, 'd').format('YYYY-MM-DD')
  }
  if (startHour < 12) {
    return startDate.dateString
  }
  if (bookedHours[startDate.dateString]) {
    let time = bookedHours[startDate.dateString].find(timeString => {
      let [hour] = timeString.split(':')
      console.log(startHour <= +hour, startHour, +hour)
      return startHour <= +hour
    })
    console.log('time', time)
    return !time ? startTime.add(1, 'd').format('YYYY-MM-DD') : startDate.dateString
  } else if (bookedHours[startDate.dateString] !== 'false') {
    return startTime.add(1, 'd').format('YYYY-MM-DD')
  }
}
