import clsx from 'clsx';
import { lazy, Suspense } from 'react';

const Upload = lazy(() => import('components/Upload'));

function App() {
  return (
    <>
      <div className={clsx('p-4')}>
        <Suspense fallback>
          <Upload />
        </Suspense>
      </div>
    </>
  );
}

export default App;
