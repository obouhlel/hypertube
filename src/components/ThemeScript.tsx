export const themeInitScript = `
  (function() {
    try {
      const root = document.documentElement;
      
      // Get the theme mode (light/dark)
      const storedMode = localStorage.getItem('theme-mode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialMode = storedMode || (prefersDark ? 'dark' : 'light');
      
      // Get the accent color
      const storedColor = localStorage.getItem('theme-color');
      const initialColor = storedColor || 'blue';
      
      // Apply classes immediately
      root.classList.add(initialMode);
      root.classList.add('theme-' + initialColor);
    } catch (e) {
      // In case of error, apply default theme
      document.documentElement.classList.add('light');
      document.documentElement.classList.add('theme-blue');
    }
  })();
`;

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeInitScript,
      }}
    />
  );
}
