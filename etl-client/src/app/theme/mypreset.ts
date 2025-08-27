import {definePreset} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f4ef',
      100: '#cce9df',
      200: '#99d3bf',
      300: '#66bda0',
      400: '#3ecf8e',
      500: '#28a46f',
      600: '#1f8257',
      700: '#16613f',
      800: '#0d3f27',
      900: '#006239',
      950: '#00452a',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#121212',
          50: '#1e1e1e',
          100: '#2a2a2a',
          200: '#333333',
          300: '#3d3d3d',
          400: '#474747',
          500: '#525252',
          600: '#636363',
          700: '#757575',
          800: '#8a8a8a',
          900: '#a1a1a1',
          950: '#cfcfcf',
        },
        text: {
          color: '#ffffff',
          secondary: '#e0e0e0',
          muted: '#b3b3b3',
        },
        primary: {
          color: '{primary.600}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.900}',
          activeColor: '{primary.800}'
        },
        secondary: {
          color: '{primary.100}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.900}',
          activeColor: '{primary.800}'
        },
        highlight: {
          background: 'rgba(255, 204, 128, 1)',
          focusBackground: 'rgba(255, 204, 128, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#d6d6d6',
          500: '#cfcfcf',
          600: '#bdbdbd',
          700: '#9e9e9e',
          800: '#7d7d7d',
          900: '#616161',
          950: '#424242',
        },
        text: {
          color: '#212121',
          secondary: '#424242',
          muted: '#757575',
        },
        primary: {
          color: '{primary.600}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}'
        },
        secondary: {
          color: '{primary.100}',
          inverseColor: '#212121',
          hoverColor: '{primary.200}',
          activeColor: '{primary.300}'
        },
        highlight: {
          background: 'rgba(255, 224, 178, 1)',
          focusBackground: 'rgba(255, 224, 178, .24)',
          color: '#212121',
          focusColor: '#212121'
        }
      }
    },
  },
});
