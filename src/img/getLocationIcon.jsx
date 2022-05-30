import React from 'react';

export const getLocationIcon = (color = "#C4C4C4") => (
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9C1 10.892 1.402 12.13 2.5 13.5L9 21L15.5 13.5C16.598 12.13 17 10.892 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1V1Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const getLocationIconText = (color = "#C4C4C4") => `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C3.8 0 0 3.22 0 8.2C0 11.38 2.45 15.12 7.34 19.43C7.72 19.76 8.29 19.76 8.67 19.43C13.55 15.12 16 11.38 16 8.2C16 3.22 12.2 0 8 0ZM8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10Z" fill="${color}"/>
</svg>`