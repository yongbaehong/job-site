'use strict'
import moment from 'moment'

export const timeDiffFromNow = time => {
  let calcTime = new Date(time),
    day = calcTime.getDate(),
    month = calcTime.getMonth(),
    year = calcTime.getFullYear(),
    hours = calcTime.getHours(),
    min = calcTime.getMinutes()
  const appliedDate = moment([year, month, day, hours, min]).fromNow()
  return appliedDate
}

export const timeYearMonthDay = time => {
  let { years, months, date } = moment(time).toObject()
  return `${moment.months(months)} ${date}, ${years}`
}
