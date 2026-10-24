// File Name: calendar.js
// Author: Rhett Bauchop - 20722517
// Purpose: Handles all the date calculations, how many dates to render, stepping between months and 
// Calculates the amount of days to render based on the selected dates month. recalculates when date changes month
import { ref, computed, watch } from 'vue'

const currentDate = ref(new Date())
const days = ref([])
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const firstDayOffSet = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay() - 1
})

function buildCalendarGrid() {
  // Declare the month array
  days.value = []
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  // Add the tail end of dates from the previous month to the array. Only dates that will be in the same week as the 1st of the month
  for (let i = firstDayOffSet.value; i > 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value, 1 - i)
    days.value.push({ date, isCurrentMonth: false })
  }

  // Add all the days in the month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d)
    days.value.push({ date, isCurrentMonth: true })
  }

  // Calculates and adds the starting dates of the next month to fill the rest of the week
  while (days.value.length % 7 !== 0) {
    const finalIndex = days.value.length - (firstDayOffSet.value + daysInMonth) + 1
    const date = new Date(currentYear.value, currentMonth.value + 1, finalIndex)
    days.value.push({ date, isCurrentMonth: false })
  }
}

// Watcher to update based on date, and rebuild when month changes
watch(currentDate, buildCalendarGrid, { immediate: true })

// Public functions and consts
export function calendar() {
  const displayLabel = computed(() =>
    currentDate.value.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' }),
  )
  // Reset date to get current month render
  function goToToday() {
    currentDate.value = new Date()
  }

  // Shift date by month
  function shiftPeriod(direction) {
    const d = new Date(currentDate.value)
    d.setMonth(d.getMonth() + direction)
    currentDate.value = d
  }

  return {
    days,
    currentDate,
    currentYear,
    currentMonth,
    displayLabel,
    goToToday,
    shiftPeriod,
  }
}
