import { ref, onMounted, onUnmounted } from 'vue'

const SCROLL_THRESHOLD = 200

export const useScrollToTop = () => {
  const isVisible = ref(false)

  const handleScroll = () => {
    isVisible.value = window.scrollY >= SCROLL_THRESHOLD
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isVisible, scrollToTop }
}
