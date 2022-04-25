import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
   
   
  }

  .app_bg{
    background: ${({ theme }) => theme.body};
  }

  .color_1{
    color: ${({ theme }) => theme.primary};
  }

  .color_2{
    color: ${({ theme }) => theme.secondary};
  }

  .color_3{
    color: ${({ theme }) => theme.third};
  }

  .border_1{
    border: 2px solid ${({ theme }) => theme.primary};
  }

  .border_top_3{
    border-top: 3px solid ${({ theme }) => theme.third};
  }

  .border_top_3{
    border-top: 3px solid ${({ theme }) => theme.third};
  }
  .border_3{
    border: 1px solid ${({ theme }) => theme.third};
  }

  .bg_3 {
    background-color: ${({ theme }) => theme.third}
  }

  .border_2{
    border: 1px solid ${({ theme }) => theme.secondary};
  }

  .primary_btn {
    border: 2px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
  .secondary_btn {
    background-color: ${({ theme }) => theme.third};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
  }

  .shadow_bottom_1{
    box-shadow: 0 5px 5px -5px ${({ theme }) => theme.primary};
  }

  .shadow_all_1{
    box-shadow: ${({ theme }) => theme.primary} 0px 3px 8px;
  }

  .icon_fill_1{
    fill: ${({ theme }) => theme.primary};
  }

  .color_hover_1:hover {
    color: ${({ theme }) => theme.third};
  }

  .bg_dark{
    background-color: ${({ theme }) => theme.dark}
  }

`;

// transition: all 0.25s linear;
