import { FormEvent, useEffect, useState } from 'react'
import { Blank, DiscountState, DiscountStatus } from './types'

export const SHOW_INITIAL = 'SHOW INITIAL'
export const STAY_SYNCED = 'STAY SYNCED'
export const KEEP_VALUE = 'KEEP VALUE'

export const useDiscount = (discountFromAbove: DiscountState) => {
  const [discount, setDiscount] = useState<DiscountState>({
    status: DiscountStatus.SHOW_INITIAL,
    value: Blank.blank_string,
  })

  const handleSetDiscount = (e: FormEvent<HTMLInputElement>) => {
    const discount = e.currentTarget.value

    // Number input will only responde legid inputs (number or blank space '')
    // Illegal inputs will only trigger the event once when input converts from legid to illegal status,
    // and the event value will be a blank space ''.
    // then any further illegal inputs won't trigger event any more.
    setDiscount({
      status: DiscountStatus.STAY_SYNCED,
      value: discount === '' ? Blank.blank_string : Number(discount),
    })
  }

  useEffect(() => {
    if (discountFromAbove) {
      const { status, value } = discountFromAbove
      if (status !== DiscountStatus.SHOW_INITIAL)
        setDiscount(current => ({
          status: status,
          value: status === DiscountStatus.STAY_SYNCED ? value : current.value,
        }))
    }
  }, [discountFromAbove])

  return [discount, handleSetDiscount, setDiscount] as const
}
