export function convertTo12Hour(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':')
    const date = new Date()
    date.setHours(hours, minutes, seconds)

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

export function hasValue(value) {
  return value != null && String(value).trim().toLowerCase() !== 'null'
}

export function formatDescription(value) {
  return String(value ?? '').replace(/\\n/g, '\n')
}

export function shortenDescription(value) {
    const description = formatDescription(value)
    const lines = description.split('\n')

    if (lines.length <= 3) return description

    return `${lines.slice(0, 3).join('\n')}...`
}