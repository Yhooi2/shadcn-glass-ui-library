import { ThemeProvider } from '@/lib/theme-context';
import { ComponentShowcase } from './components/demos/ComponentShowcase';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ComponentShowcase />
    </ThemeProvider>
  );
}

export default App;
