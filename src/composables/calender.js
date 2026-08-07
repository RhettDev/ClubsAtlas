import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const viewMode = ref('month')

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

  return { currentDate, viewMode, displayLabel, goToToday, setViewMode, shiftPeriod }
}
