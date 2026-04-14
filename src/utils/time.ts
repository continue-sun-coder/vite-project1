// 根据当前时间获取问候语
export const getGreeting = () => {
  let message: string
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    message = '上午好'
  } else if (hour >= 12 && hour < 14) {
    message = '中午好'
  } else if (hour >= 14 && hour < 18) {
    message = '下午好'
  } else if (hour >= 18 && hour < 22) {
    message = '晚上好'
  } else {
    message = '你好'
  }
  return message
}
