const addZero = (val: number) => {
  return `0${val}`.slice(-2);
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (date: Date) => {
  if (date) {
    return `${months[date.getMonth()]} ${addZero(date.getDate())}, ${date.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true })}`
  }
  return ''
}