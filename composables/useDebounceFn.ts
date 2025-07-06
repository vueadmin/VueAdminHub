export const useDebounceFn = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}