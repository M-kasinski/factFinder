import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/app/theme-provider';
import { DarkClassSync } from '@/components/DarkClassSync';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  function setup() {
    render(
      <ThemeProvider
        attribute="class"
        defaultTheme="legacy-light"
        themes={['legacy-light','legacy-dark','standard-light','standard-dark']}
        value={{
          'legacy-light': 'legacy-light',
          'legacy-dark': 'legacy-dark',
          'standard-light': 'standard-light',
          'standard-dark': 'standard-dark',
        }}
      >
        <DarkClassSync />
        <ThemeToggle />
      </ThemeProvider>
    );
  }

  it('applies standard dark theme', async () => {
    setup();
    const toggle = screen.getByRole('button');
    await userEvent.click(toggle);
    await userEvent.click(screen.getByText('settings.standardDark'));
    expect(document.documentElement.classList.contains('standard-dark')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('applies standard light theme without dark class', async () => {
    setup();
    const toggle = screen.getByRole('button');
    await userEvent.click(toggle);
    await userEvent.click(screen.getByText('settings.standardLight'));
    expect(document.documentElement.classList.contains('standard-light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
