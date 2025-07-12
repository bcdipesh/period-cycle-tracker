import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}
