import { defineThemes } from '../theme/theme.models';
import { appThemes } from '../theme/themes';

const sizes = {
  small: {
    height: '28px',
    fontSize: '12px',
  },
  medium: {
    height: '34px',
    fontSize: '14px',
  },
  large: {
    height: '40px',
    fontSize: '16px',
  },
};

export const { useTheme } = defineThemes({
  dark: {
    sizes,

    backgroundColor: '#171717',
    borderColor: '#262626',
    dropdownShadow: 'rgba(0, 0, 0, 0.4) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: '#262626',
      },
      active: {
        textColor: appThemes.dark.primary.color,
      },
    },

    focus: {
      backgroundColor: '#F974151a',
    },
  },
  light: {
    sizes,

    backgroundColor: '#ffffff',
    borderColor: '#e0e0e69e',
    dropdownShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: '#eee',
      },
      active: {
        textColor: appThemes.light.primary.color,
      },
    },

    focus: {
      backgroundColor: '#ffffff',
    },
  },
});
