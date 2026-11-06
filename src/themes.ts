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
    bodyColor: brandTokens.light.surface,
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: brandTokens.light.surface },

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
    bodyColor: brandTokens.dark.background,
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
    color: brandTokens.dark.background,
    siderColor: brandTokens.dark.surface,
    siderBorderColor: brandTokens.dark.border,
  },

  Card: {
    color: brandTokens.dark.surface,
    borderColor: brandTokens.dark.border,
  },

  Table: {
    tdColor: brandTokens.dark.surface,
    thColor: brandTokens.families.neutral['800'],
  },
};
