// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollToTop } from '../../composables/useScrollToTop'

const onMountedCallback = vi.fn()
const onUnmountedCallback = vi.fn()

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    onMounted: (cb: () => void) => {
      onMountedCallback(cb)
      cb()
    },
    onUnmounted: (cb: () => void) => {
      onUnmountedCallback(cb)
    },
  }
})

describe('useScrollToTop', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    onMountedCallback.mockClear()
    onUnmountedCallback.mockClear()
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    window.scrollTo = vi.fn()
  })

  it('isVisible is false when scrollY is below threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 100 })

    const { isVisible } = useScrollToTop()

    window.dispatchEvent(new Event('scroll'))

    expect(isVisible.value).toBe(false)
  })

  it('isVisible is true when scrollY reaches threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 200 })

    const { isVisible } = useScrollToTop()

    window.dispatchEvent(new Event('scroll'))

    expect(isVisible.value).toBe(true)
  })

  it('isVisible is true when scrollY exceeds threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 500 })

    const { isVisible } = useScrollToTop()

    window.dispatchEvent(new Event('scroll'))

    expect(isVisible.value).toBe(true)
  })

  it('scrollToTop calls window.scrollTo with smooth behavior', () => {
    const { scrollToTop } = useScrollToTop()

    scrollToTop()

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('registers scroll event listener on mount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')

    useScrollToTop()

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('removes scroll event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    useScrollToTop()

    const unmountCb = onUnmountedCallback.mock.calls[0][0]
    unmountCb()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
