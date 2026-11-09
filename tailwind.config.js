/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite/plugin";

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Montserrat',
  				'Padauk',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				'50': '#f8f6ee',
  				'100': '#efead2',
  				'200': '#e1d4a7',
  				'300': '#cfb875',
  				'400': '#c4a358',
  				'500': '#b18a41',
  				'600': '#986e36',
  				'700': '#7a532e',
  				'800': '#67452c',
  				'900': '#593b2a',
  				'950': '#331f15'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [flowbite(), require("tailwindcss-animate")],
};
