import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { ReactComponent as Icon } from 'assets/images/upload/download.svg';

const Upload = () => {
  // Traditional upload
  const ref = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const handleUpload: MouseEventHandler<HTMLElement> = () => {
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
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-lg p-3',
          'max-w-lg transition-all h-72',
          'flex cursor-pointer',
          dragging && '!p-5 bg-gray-50'
        )}
        onDrag={handleDrag}
        onDragStart={handleDrag}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragEnd={handleLeave}
        onDragLeave={handleLeave}
        onDrop={handleLeave}
        onClick={handleUpload}
      >
        <div
          className={clsx(
            'rounded-lg border',
            'border-dashed border-2',
            'flex-1 flex justify-center items-center',
            'pointer-events-none'
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
          <div
            className={clsx(
              'flex justify-center items-center',
              'flex-col',
              url && 'hidden'
            )}
          >
            <Icon className={clsx('w-32 mb-2')} />
            <div className={clsx('select-none', dragging && 'hidden')}>
              <span className={clsx('font-bold cursor-pointer')}>
                Choose a file
              </span>{' '}
              <span>or drag it here.</span>
            </div>
            <div className={clsx('hidden', dragging && '!block')}>
              Drop to upload.
            </div>
          </div>
          <img
            className={clsx(
              'h-auto w-auto object-contain',
              'max-w-full max-h-full rounded-lg',
              !url && 'hidden'
            )}
            src={url}
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};

export default Upload;
