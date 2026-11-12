import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetWind3(), presetAttributify({
    ignoreAttributes: ['size'],
  }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#F97415',
      amber: {
        DEFAULT: '#F59E0B',
        glass: 'hsla(38, 92%, 50%, 0.14)',
        border: 'hsla(38, 92%, 50%, 0.45)',
      },
    },
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Space Grotesk", system-ui, sans-serif',
      heading: '"Space Grotesk", system-ui, sans-serif',
      body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
  },
  shortcuts: {
    // Inlined expansion of the preset's `scrollbar` shortcut, minus `scrollbar-width-auto`
    // and `scrollbar-color-[...]`: preset-scrollbar 4.0.0 only registers rules for those
    // two when `compatible: true`, so they trigger "unmatched utility" build warnings, and
    // enabling compatible mode would make browsers ignore the ::-webkit-scrollbar styling.
    'pretty-scrollbar': 'overflow-auto scrollbar-custom-property scrollbar-track:scrollbar-background-color-[var(--scrollbar-track)] scrollbar-thumb:scrollbar-background-color-[var(--scrollbar-thumb)] scrollbar:scrollbar-width-[var(--scrollbar-width)] scrollbar:scrollbar-height-[var(--scrollbar-height)] scrollbar-rounded scrollbar-thumb-color-gray-300 scrollbar-track-color-gray-100 dark:scrollbar-thumb-color-#424242 dark:scrollbar-track-color-#686868',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-#ffffff dark:bg-#171717',
    'bg-background': 'bg-#f5f5f5 dark:bg-#0a0a0a',
  },
});
