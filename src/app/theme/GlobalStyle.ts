import { createGlobalStyle } from "styled-components";

//Reset CSS
const GlobalStyle = createGlobalStyle`
*,
:before,
:after {
  box-sizing: border-box;
  -webkit-user-drag: none;
  outline: none;
}

html {
  touch-action: pan-x pan-y;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  width: 100%;
  line-height: 1.4;
  font-size: 14px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  overscroll-behavior: none;
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  font: inherit;
}

small {
  font-size: 85%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  line-height: 1;
  cursor: pointer;
  background-color: inherit;
  border: 0;
  color: inherit;
  padding: 0;
}

img,
svg {
  display: block;
  max-width: 100%;
  height: auto;
  border: none;
}


textarea {
  resize: none;
}

label {
  display: block;
}

fieldset {
  border: 1px solid;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

hr {
  border: none;
  border-bottom: 1px solid;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

th {
  font-weight: inherit;
}

iframe {
  border: 0;
}

menu {
  margin: 0;
  padding: 0;
}

form,
figure,
pre,
blockquote,
dl,
dd {
  margin: 0;
}

address {
  font: inherit;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}
::-moz-placeholder { /* Firefox 19+ */
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}
:-ms-input-placeholder { /* IE 10+ */
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}
:-moz-placeholder { /* Firefox 18- */
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}

.thumbnail {
  position: relative;
  display: inline-block;
  margin-right: 10px; /* Espaçamento opcional entre as miniaturas */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo escura com transparência */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out; /* Efeito de transição */
}

.overlay:hover {
  opacity: 1; /* Torna o overlay visível ao passar o mouse */
  border-radius: 8px;
}

.remove-button {
  color: white; /* Cor do texto do botão */
  background-color: red; /* Cor de fundo do botão */
  border: none;
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
}

input[type=date]{
  border: none;
  border-radius: 6px;
}

select, options{
  font-family: 'Poppins', sans-serif;
}

@media (max-width: 768px){

    .slick-dots {
      margin-top: 4rem;
      position: relative;
      top: -2rem;
      color: red; 
      fill: red;
  }

  .slick-active::button{
    display: none;
 
  }
}

.carousel .control-dots .dot{
  transition: opacity .25s ease-in;
  opacity: .3;
  filter: alpha(opacity=30);
  box-shadow: 1px 1px 2px rgba(0,0,0,0.9);
  background: #0d006d;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  cursor: pointer;
  display: inline-block;
  margin: 0 8px;
}

.slick-dots li button:hover:before, .slick-dots li button:focus:before{
  opacity: 1;
  color: #0d006d;
}

.slick-dots li button:before{
  opacity: 0.25;
  color: #0d006d;
}

@media (width > 768px){

  .slick-dots {
    margin-top: 4rem;
    position: relative;
    top: -6rem;

}
}

`

export default GlobalStyle;
