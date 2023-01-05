import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import Button from './Button';
import clsx from 'clsx';

const Upload = () => {
  // Traditional upload
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

  // Drag and drop
  const [dragging, setDragging] = useState(false);
  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  const handleLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-lg p-3',
          'max-w-lg transition-all h-80',
          'flex',
          dragging && '!p-5 bg-gray-50'
        )}
        onDrag={handleDrag}
        onDragStart={handleDrag}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragEnd={handleLeave}
        onDragLeave={handleLeave}
        onDrop={handleLeave}
      >
        <div
          className={clsx(
            'rounded-lg border',
            'border-dashed border-2',
            'flex-1 flex justify-center items-center'
          )}
        >
          <input
            ref={ref}
            type="file"
            accept="image/*"
            onChange={handleChange}
            id="upload"
            name="upload"
            className="hidden"
          />
          <div>
            <div className="select-none">
              <span
                onClick={handleUpload}
                className={clsx('font-bold cursor-pointer')}
              >
                Choose a file
              </span>{' '}
              <span>or drag it here.</span>
            </div>
          </div>
          <img src={url} alt="" />
        </div>
      </div>
    </>
  );
};

export default Upload;
