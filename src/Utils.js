/**
 * @prettier
 * @flow
 * */

import moment from 'moment'

const DEFAULT_DATE_PICKER_FORMAT = 'ddd MMM D'

const AM = 'AM'
const PM = 'PM'
const YEAR = 365
const TODAY = 'Today'
const ONE_DAY_IN_SECONDS = 86400;
const ONE_SECOND = 1000;

// it takes in format '12 AM' and return 24 format
export function hourTo24Format(hour: string) {
    return parseInt(moment(hour, ['h A']).format('H'), 10)
}

// it takes in format 23 and return [11,'PM'] format
export function hourTo12Format(hour: number) {
    const currDate = new Date()
    currDate.setHours(hour)
    return dateTo12Hour(currDate.toISOString())
}

export const dateTo12Hour = (dateString: string) => {
    const localDate = new Date(dateString)
    let hour = localDate.getHours()
    if (hour === 12) {
        return ['12', PM]
    }
    if (hour === 0) {
        return ['12', AM]
    }
    const afterMidday = hour % 12 === hour
    hour = afterMidday ? hour : hour % 12
    const amPm = afterMidday ? AM : PM
    return [hour.toString(), amPm]
}

export function increaseDateByDays(date: Date, numOfDays: ?number) {
    const nextDate = new Date(date.valueOf())
    nextDate.setDate(nextDate.getDate() + numOfDays)
    return nextDate
}

export function pickerDateArray(date: string, daysCount: number = YEAR, datePickerFormat: string = DEFAULT_DATE_PICKER_FORMAT) {
    const startDate = date ? new Date(date) : new Date()
    const arr = []

    for (let i = 0; i < daysCount; i++) {
        const ithDateFromStartDate = (Date.parse(startDate) / ONE_SECOND) + (i * ONE_DAY_IN_SECONDS)
        if (moment.unix(Date.parse(new Date()) / ONE_SECOND).format('MM/DD/YYYY') ===
            moment.unix(ithDateFromStartDate).format('MM/DD/YYYY')) {
            arr.push(TODAY)
        }
        else {
            arr.push(
                formatDatePicker(ithDateFromStartDate, datePickerFormat)
            )
        }
    }
    return arr
}

function formatDatePicker(date: number, format: string) {
    return moment.unix(date).format(format);
}

export function getHoursArray(format24: boolean) {
    const hours = format24 ? { min: 0, max: 23 } : { min: 1, max: 12 }
    const arr = []
    for (let i = hours.min; i <= hours.max; i++) {
        arr.push(`00${i}`.slice(-2))
    }
    return arr
}

export function getFiveMinutesArray() {
    const arr = []
    arr.push('00')
    arr.push('05')
    for (let i = 10; i < 60; i += 5) {
        arr.push(`${i}`)
    }
    return arr
}

export function getAmArray() {
    const arr = []
    arr.push(AM)
    arr.push(PM)
    return arr
}
