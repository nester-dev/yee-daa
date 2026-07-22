import {
  type ChangeEvent,
  type ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Cropper, { type Area } from "react-easy-crop";

import { getCroppedImg } from "@/shared/lib/get-cropped-img";

import UiImage from "../ui-image/ui-image";

import styles from "./ui-image-upload.module.scss";

export type UiImageUploadRef = {
  file: File | null;
  getFile: () => File | null;
  getCroppedFile: () => Promise<File | null>;
  getUploadFile: () => Promise<File | null>;
};

type Props = {
  preview: string | undefined;
  setPreview: (preview: string | undefined) => void;
  withCrop?: boolean;
  cropperProps?: ComponentProps<typeof Cropper>;
};

const UiImageUpload = forwardRef<UiImageUploadRef, Props>(
  ({ preview, setPreview, withCrop = true, cropperProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<File | null>(null);
    const hasMoved = useRef(false);
    const isCropperVisible = withCrop && Boolean(preview);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
      null,
    );

    useImperativeHandle(
      ref,
      () => ({
        get file() {
          return fileRef.current;
        },
        getFile() {
          return fileRef.current;
        },
        async getCroppedFile() {
          if (!preview || !croppedAreaPixels) {
            return null;
          }

          return getCroppedImg(preview, croppedAreaPixels);
        },
        async getUploadFile() {
          if (!withCrop) {
            return fileRef.current;
          }

          if (!preview || !croppedAreaPixels) {
            return fileRef.current;
          }

          return getCroppedImg(preview, croppedAreaPixels);
        },
      }),
      [croppedAreaPixels, preview, withCrop],
    );

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      fileRef.current = file;
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    };

    const handleClick = () => {
      if (!isCropperVisible || !hasMoved.current) {
        inputRef.current?.click();
      }
    };

    return (
      <button type="button" className={styles.preview} onClick={handleClick}>
        {isCropperVisible && (
          <div className={styles.image}>
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              onCropComplete={(_, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
              onCropChange={(location) => {
                setCrop(location);
                hasMoved.current = true;
              }}
              onZoomChange={(zoomValue) => {
                setZoom(zoomValue);
                hasMoved.current = true;
              }}
              onInteractionStart={() => {
                hasMoved.current = false;
              }}
              onInteractionEnd={() => {
                setTimeout(() => {
                  hasMoved.current = false;
                }, 100);
              }}
              cropShape="round"
              aspect={1}
              cropSize={{ width: 190, height: 190 }}
              {...cropperProps}
            />
          </div>
        )}
        <UiImage className={styles.image} src={preview} alt="image-preview" />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </button>
    );
  },
);

export default UiImageUpload;
