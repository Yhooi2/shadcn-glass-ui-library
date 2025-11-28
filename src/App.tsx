import { ThemeProvider } from "@/lib/theme-context";
import { GlassFixesDemo } from "./components/GlassFixesDemo";

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <GlassFixesDemo />
    </ThemeProvider>
  );
}

export default App;
