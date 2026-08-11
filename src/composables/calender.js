import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const viewMode = ref('month')
const days = ref([])
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const firstDayOffSet = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay() - 1
})

export function calendar() {
  const displayLabel = computed(() =>
    currentDate.value.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' }),
  )

  function goToToday() {
    currentDate.value = new Date()
  }

  function setViewMode(mode) {
    viewMode.value = mode
  }

  function shiftPeriod(direction) {
    const d = new Date(currentDate.value)
    if (viewMode.value === 'month') {
      d.setMonth(d.getMonth() + direction)
    } else {
      d.setDate(d.getDate() + direction * 7)
    }
    currentDate.value = d
  }

  // function getCalendarGrid(year, month) {
  //   const daysInMonth = computed(() => {
  //     return new Date(year.value, month.value, 0).getDate()
  //   })

  //   // Leading Days (Previous Month)
  //   for (let i = firstDayOffSet.value; i > 0; i--) {
  //     const date = new Date(year.value, month.value, 1 - i)
  //     days.value.push({ date, isCurrentMonth: false })
  //   }

  //   // Current Month Days
  //   for (let d = 1; d <= daysInMonth.value; d++) {
  //     const date = new Date(year.value, month.value, d)
  //     days.value.push({ date, isCurrentMonth: true })
  //   }

  //   // Trailing Days
  //   while (days.value.length % 7 !== 0) {
  //     const finalIndex = days.value.length - (firstDayOffSet.value + daysInMonth.value) + 1
  //     const date = new Date(year.value, month.value + 1, finalIndex)
  //     days.value.push({ date, isCurrentMonth: false })
  //   }
  //   return days
  // }

  return { days, currentDate, viewMode, displayLabel, goToToday, setViewMode, shiftPeriod }
}
