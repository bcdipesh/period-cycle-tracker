import { dark } from '@clerk/themes';

export const getFormAppearance = (theme: string | undefined) => ({
  baseTheme: theme === 'dark' ? dark : undefined,
  elements: {
    button: {
      borderRadius: 'var(--radius-sm)',
    },
    cardBox: 'dark:bg-gradient-to-br dark:from-rose-950 dark:to-purple-950',
    card: {
      background: 'transparent',
      boxShadow: 'none',
    },
    formFieldInput: {
      backgroundColor: 'color-mix(in oklab, var(--input) 30%, transparent)',
      borderRadius: 'var(--radius-sm)',
    },
    formButtonPrimary: {
      backgroundColor: 'var(--primary)',
      '&:hover': {
        backgroundColor: 'color-mix(in oklab, var(--primary) 90%, transparent)',
      },
      boxShadow: 'none !important',
      color: 'var(--primary-foreground)',
    },
    footer: {
      background: 'transparent',
    },
  },
  layout: {
    unsafe_disableDevelopmentModeWarnings: true,
  },
});
