if (typeof window !== 'undefined') {
  const pagSeguroScript = document.createElement('script')
  pagSeguroScript.setAttribute(
  'src',
  'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js'
  )
  document.head.appendChild(pagSeguroScript)
  }

export function encryptCardPagSeguro(cardData) {
const card = PagSeguro.encryptCard({
publicKey: cardData.publicKey,
holder: cardData.holder,
number: cardData.number,
expMonth: cardData.expMonth,
expYear: cardData.expYear,
securityCode: cardData.securityCode
})

return card
}
