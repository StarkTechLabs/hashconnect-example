
const THOUSAND = 1000
const MILL = 1000000

export const round = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const formatCount = count => {
  if (!count || typeof count !== 'number') return '0'

  if (count < THOUSAND) {
    return `${count}`
  }

  if (count < MILL) {
    return `${round(count / THOUSAND)}K`
  }

  if (count >= MILL) {
    return `${round(count / MILL)}M`
  }

  return '0'
}
