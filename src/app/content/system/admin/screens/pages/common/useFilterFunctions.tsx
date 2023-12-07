'use client'

import { MouseEvent } from "react";
import lodash from 'lodash'

export function useFilterFunctions({hook, setHook}) {

  function orderByGrowing(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)
    const orderArray = [...hook].sort((a, b) => a[property] - b[property])
    setHook(orderArray)
  }


  function orderByDescending(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)
    const orderArray = [...hook].sort((a, b) => b[property] - a[property])
    setHook(orderArray)
  }

  function orderByDateGrowing(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)
    const orderArray = [...hook].sort((a, b) => Number(new Date(a[property])) - Number(new Date(b[property])))
    setHook(orderArray)
  }

  function orderByDateDescending(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)
    const orderArray = [...hook].sort((a, b) => Number(new Date(b[property])) - Number(new Date(a[property])))
    setHook(orderArray)
  }

  function orderByStringGrowing(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)

    const orderArray = [...hook].sort((a, b) => {
      const propA = lodash.get(a, property)
      const propB = lodash.get(b, property)

      return propA?.localeCompare(propB)
    })
    setHook(orderArray)
  }

  function orderByStringDescending(ev: MouseEvent, property: string) {
    colorArrowClicked(ev)
    const orderArray = [...hook].sort((a, b) => {
      const propA = lodash.get(a, property)
      const propB = lodash.get(b, property)

      return propB?.localeCompare(propA)
    })
    setHook(orderArray)
  }

  function colorArrowClicked(ev: MouseEvent) {
    const buttons = ev.currentTarget.closest('tr').querySelectorAll<HTMLElement>('span svg')
    buttons.forEach((element) => {
      element.style.fill = 'gray'
    })
    ev.currentTarget.querySelector('svg').style.fill = 'black'
  }

  return {
    orderByGrowing,
    orderByDescending,
    orderByDateGrowing,
    orderByDateDescending,
    orderByStringGrowing,
    orderByStringDescending
  }
}
