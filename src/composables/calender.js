import { ref, computed, watch } from 'vue'

const currentDate = ref(new Date())
const viewMode = ref('month')
const days = ref([])
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const firstDayOffSet = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay() - 1
})

function buildCalendarGrid() {
  days.value = []
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  for (let i = firstDayOffSet.value; i > 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value, 1 - i)
    days.value.push({ date, isCurrentMonth: false })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d)
    days.value.push({ date, isCurrentMonth: true })
  }

  while (days.value.length % 7 !== 0) {
    const finalIndex = days.value.length - (firstDayOffSet.value + daysInMonth) + 1
    const date = new Date(currentYear.value, currentMonth.value + 1, finalIndex)
    days.value.push({ date, isCurrentMonth: false })
  }
}

watch(currentDate, buildCalendarGrid, { immediate: true })

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

  return {
    days,
    currentDate,
    currentYear,
    currentMonth,
    viewMode,
    displayLabel,
    goToToday,
    setViewMode,
    shiftPeriod,
  }
}
