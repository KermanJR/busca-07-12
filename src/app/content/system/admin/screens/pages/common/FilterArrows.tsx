import { MouseEvent } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import styles from './style.module.css';

export function FilterArrows({functionupArrow, functionDownArrow, property}: {functionupArrow?: (ev: MouseEvent, property: string) => void, functionDownArrow?: (ev: MouseEvent, property: string) => void, property: string}) {
  return <div className={`${styles.filter}`}><span onClick={(ev) => functionupArrow(ev, property)}><BiSolidUpArrow /></span><span onClick={(ev) => functionDownArrow(ev, property)}><BiSolidDownArrow /></span></div>
}