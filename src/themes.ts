import type { GlobalThemeOverrides } from 'naive-ui';
import brandTokens from '@/brand/tokens.json';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    primaryColor: brandTokens.families.primary['500'],
    primaryColorHover: brandTokens.families.primary['400'],
    primaryColorPressed: brandTokens.families.primary['600'],
    primaryColorSuppl: brandTokens.families.primary['400'],
    // Keep <body> the same color as the Layout background: Safari 26+ ignores
    // theme-color and derives its browser chrome tint from the body background.
    bodyColor: '#F8FAFC',
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#F8FAFC',
    siderColor: '#FFFFFF',
    siderBorderColor: 'rgba(0, 0, 0, 0.08)',
  },

  Card: {
    color: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    primaryColor: brandTokens.families.primary['500'],
    primaryColorHover: brandTokens.families.primary['400'],
    primaryColorPressed: brandTokens.families.primary['600'],
    primaryColorSuppl: brandTokens.families.primary['400'],
    // Match the Layout background (see lightThemeOverrides.common.bodyColor)
    bodyColor: '#0A0A0A',
  },

  Notification: {
    color: brandTokens.dark.surface,
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: brandTokens.dark.surface },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#0A0A0A',
    siderColor: '#171717',
    siderBorderColor: 'rgba(255, 255, 255, 0.08)',
  },

  Card: {
    color: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  Table: {
    tdColor: 'rgba(255, 255, 255, 0.04)',
    thColor: 'rgba(255, 255, 255, 0.08)',
  },
};
