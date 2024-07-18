import { FC, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button, FileInput, Label } from 'flowbite-react';

interface ImageInputProps {
  fieldname: string;
  register: UseFormRegister<any>;
  setImageFile: (file: File | null) => void;
  urlPreview?: string | undefined;
}

const ImageInput: FC<ImageInputProps> = ({
  fieldname,
  register,
  setImageFile,
  urlPreview,
}) => {
  const [preview, setPreview] = useState<string | null>(urlPreview || null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex md:h-150 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-spacing-12 border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                onClick={() => setPreview(null)}
                className="mt-2 text-xs text-red-500 border-solid border-2 border-white dark:border-gray-800"
              >
                Clear Image
              </Button>
            </>
          ) : (
            <>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFR0lEQVR4nO2cfU8cVRTG+Uc/i+L38js0O2UubAu2vLQrpWIhviTapDaNdAe1pTvUmhSNwWp0q4ZaQHktsDO79+4MG2lyzFlYhIVlduftXmbOkzwJacnCeX53zrl7N9yuLhKJRCKRSCQSiUQikUgkEolEIpFIpAP1aeIdpvFreoYXdU1UmSYgydY1Ua3XmuEj+gXeLW0h6Dq8yTJ8VNf4a9mhMGkwsHae+/BdeCP+8DX+SHYATBHrGT4TKwRc+bKLZopZz/DrsfX8NLcd1soZvten8bcjB4CkpRerqWo+HDkAponn8gsVipr/Fj2AjBDyCxVKWtcEjx6AAoUyhU0ANAJwLpxlAr7KO7C8uAsO3zd+PX3fqf8fPQFadOEPXRGw+vcu/FurneqV5d3691AL0qJZ+WeFfxSCnyfBNNzjzjvVguEWC4Y7UpiqBT87kt06WEBj2/EKv+HpKSc4gGN2XhcMNzc/H+DYQnaALKCXX7ptA1h6uRsygEMQM74hyA6QBXSVe7efhvF7owGArcn1d3aUJgCiEh2AQt7Zm5mudX52JDtAlogWdNiKOj87kh0gC2jc58sbws1Pgdv52VGcYfX27DvM18StJW4x29qG6iJaAIbDlQbwYLoC3xiV0F8X32SdBSHIG7HOWpDb+dlRXOHffJ9DeceCSsmC8Rs89NfH1Y0tBvs8DmY0fo3/5mflJwpAlglYemGDsK26l/+y4ZIePoQonAgAszOVw/AbfjxTlh5uKgDcusmBl46Hj+aWBZPj6j8F5xrApV4BK0snw294bdmCy33yQ04sgLkn5ZbhiwM/faJ2Kzq3AD6ZrNTbjBcAYVvw6UfqtqJzCeC9ywI2V//f9QgPv1qz4Gq//LATA2D+B+/WI5r884+29LATAeDO5ye3nKJN3/ks/HfJqQIwNMBhe8Nf+MK2YGfTguErnc+De7dLcO+2lXIAFwX8+qzz1iOaXPylXH+tdn/u+GgZdv5Zh9LKOtwaK6cXwNRd/61HNPnLu+21oqv9HFYXNsBeW6t77cU6DA5U0gfg2qAAayuc8IVtgbVtQ27k7FbU18Ph+fzmYfgN//FsE7IhnjMpD6D3ooA/i+1vOUWbXvjdPvOzg+8ebZ0Iv+G52e30AMDz/bDDFwf+Ol9pOXRbhd9wWENZaQBjuf0z/qgAVHYs+GCUnzp0vQCENZSVBYBn/IsL4bce0eSjnx00D10vhzGUlQUw+zD4llO0afxZrYaul4MOZSUBtDrjj8rcsuCnudZD18tBhrJyAOpn/IvxhS8QwJb/8IMOZeUAPP22HG/4pR2w172HblRDWSkAH0+0f8YfSvi2BeUQwg8ylJUBMJAVsL4S/a5HNGyVoLzR/o4nqqGsDID57+NtPeVXne94ohjKygBIq00CIJINAP8YWfYqY4o6q1djAJDhRdmFMkU92B/HE5DhI7ILZYp6ciyOJ+AC76brasSpn3MYXzjRA0DhNV2yVxtTzBM3Ol/9vgHg9Vx4TZfsopkizg1WoXDfjQ/AEQjX8aYo2QEwiW0HV77f8AMBODoT8KYovKwoDXcJZXuq9d3OxFgVpn30/NABeCnoL2gm3ATAIADSV6FJT4D8IMyktiD8Y2TZRZqqOu9UYgDgFqUXaqhpX1cV+AAwIrtQU1EXDGcwegBTtW68KUp2saZixutqHudrb0UOoA7BcHOyCzYVM3aGrriE13PhNV2yizYVccFwHga6N843hLx7HR+91Aafd/Zw5cce/ikzYRh3AAXDESlY7QJrNfPOkK8rykgkEolEIpFIJBKJRCKRSF1J13+hSHCjDfyvKgAAAABJRU5ErkJggg=="></img>
              <p className="mb-2 text-2xl text-gray-500 dark:text-gray-400 invisible md:visible">
                Drop your image here or
                <span
                  className="text-blue-600"
                  onClick={() => document.getElementById(fieldname)?.click()}
                >
                  {' '}
                  browse
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports: SVG, PNG, JPG or GIF
              </p>
            </>
          )}
        </div>
        <FileInput
          id={fieldname}
          {...register(fieldname)}
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>
    </div>
  );
};

export default ImageInput;
