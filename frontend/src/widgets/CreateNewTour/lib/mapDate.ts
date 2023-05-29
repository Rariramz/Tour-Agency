import { Day } from "@amir04lm26/react-modern-calendar-date-picker";


export const dateToYyyyMmDd = (date: Day) =>
    `${date.year}-${date.month < 10 ? `0${date.month}` : date.month}-${date.day < 10 ? `0${date.day}` : date.day}`

export const yyyyMmDdToDay = (date: string) => {
    const arr = date.split('-');
    return { year: +arr[0], month: +arr[1], day: +arr[2]};
}