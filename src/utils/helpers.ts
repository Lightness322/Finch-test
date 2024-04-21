export function getNumberArray(min: number, max: number) {
  const numberArray: number[] = []

  for (let num = min; num <= max; num++) {
    numberArray.push(num)
  }

  return numberArray
}

export function getUniqueRandomNumberArray(
  min: number,
  max: number,
  total: number
) {
  const numberArray: number[] = []

  while (numberArray.length < total) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    if (!numberArray.includes(randomNumber)) {
      numberArray.push(randomNumber)
    }
  }

  return numberArray
}

export function isArrayMatch(quantity: number, ...arrays: number[][]) {
  const totalArraysQty = arrays.length
  const firstArray = arrays[0]
  let coincidences = 0

  for (const number of firstArray) {
    for (let i = 1; i < totalArraysQty; i++) {
      if (!arrays[i].includes(number)) {
        break
      }
      if (i + 1 === totalArraysQty) {
        coincidences++
        if (quantity === coincidences) return true
      }
    }
  }

  return false
}

export async function fetchWithRetry<T>(
  callback: () => Promise<T>,
  retryQty = 0,
  delay = 1000
) {
  try {
    const data = await callback()

    return data
  } catch (error) {
    if (retryQty !== 0) {
      await new Promise((res, rej) => {
        setTimeout(() => {
          fetchWithRetry(callback, --retryQty, delay)
            .then((data) => res(data))
            .catch((e) => rej(e))
        }, delay)
      })
    } else {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("An error has occurred")
      }
    }
  }
}
