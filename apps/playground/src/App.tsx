import { Button, Input, ThemeProvider, useTheme } from '@simpleui/core';
import '@simpleui/core';

function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      Switch to {isDark ? 'light' : 'dark'} theme
    </Button>
  );
}

function App() {
  return (
    <ThemeProvider theme="dark">
      <div className="min-h-screen bg-background text-text-primary p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">SimpleUI Playground</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
              <div className="flex gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Button States</h2>
              <div className="flex gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
              <div className="space-y-4 max-w-md">
                <Input label="Email" placeholder="example@mail.com" type="email" />
                <Input
                  label="Password"
                  type="password"
                  error="Password must be at least 8 characters"
                />
                <Input
                  label="Username"
                  variant="success"
                  helperText="This username is available"
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Input Sizes</h2>
              <div className="space-y-4 max-w-md">
                <Input label="Small Input" inputSize="sm" placeholder="Small" />
                <Input label="Medium Input" inputSize="md" placeholder="Medium" />
                <Input label="Large Input" inputSize="lg" placeholder="Large" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Input States</h2>
              <div className="space-y-4 max-w-md">
                <Input label="Disabled Input" disabled value="Disabled value" />
                <Input label="Readonly Input" readOnly value="Readonly value" />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Theme Toggle</h2>
              <ThemeToggle />
            </section>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
