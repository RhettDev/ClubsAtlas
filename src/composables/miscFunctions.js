// File Name: miscFunctions.js
// Author: Rhett Bauchop - 20722517
// Purpose: An assortment of functions for normalisation, validation or theme handling. 
// Random function that are reused enough to be in a composable but dont belong else where

// Used to normalise time data for Supabase time format
export function convertTo12Hour(timeStr) {
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(hours, minutes)

    return new Intl.DateTimeFormat('en-UK', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
        .format(date)
        .replace(' ', '')
        .replace(':00', '')
        .toLowerCase()
}

// Used to normalise date data for Supabase date format
export function convertToFullDate(dateStr) {
    const [year, month, day] = dateStr.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    const dayNumber = date.getDate()
    const suffix =
        dayNumber % 100 >= 11 && dayNumber % 100 <= 13
            ? 'th'
            : ['th', 'st', 'nd', 'rd'][Math.min(dayNumber % 10, 3)]
    const monthName = new Intl.DateTimeFormat('en-GB', {
        month: 'long',
    }).format(date)

    return `${dayNumber}${suffix} of ${monthName}`
}

// Checks a string has value, normalises for comparison
export function hasValue(value) {
  return value != null && String(value).trim().toLowerCase() !== 'null'
}

// Scraped descriptions take in newline characters, the function prepares them for display
export function formatDescription(value) {
  return String(value ?? '').replace(/\\n/g, '\n')
}

// Used for Admin Dashboard event cards
export function shortenDescription(value) {
    const description = formatDescription(value)
    const lines = description.split('\n')

    if (lines.length <= 3) return description

    return `${lines.slice(0, 3).join('\n')}...`
}

// Set Theme
export function setDarkMode(){
    document.documentElement.dataset.theme = 'dark'
}
export function setLightMode(){
    document.documentElement.dataset.theme = 'light'
}