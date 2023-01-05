import clsx from 'clsx';
import Button from 'components/Button';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const handleUpload: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    ref.current?.click();
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <div className={clsx('p-4')}>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="upload"
          name="upload"
          className="hidden"
        />
        <Button onClick={handleUpload}>Upload</Button>
        <img src={url} alt="" />
      </div>
    </>
  );
}

export default App;
