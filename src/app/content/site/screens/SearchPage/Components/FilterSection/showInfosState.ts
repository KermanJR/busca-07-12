export function showInfosState(ev, filterName) {

  if (filterName !== 'filterState') return
  const inputsState = document.querySelectorAll('input[name="filterState"]')

  inputsState.forEach((element) => {
    const select = element.closest('aside').lastChild as HTMLElement
    select.style.display = 'none'
  })

  ev.target.closest('aside').lastChild.style.display = 'block'
}
