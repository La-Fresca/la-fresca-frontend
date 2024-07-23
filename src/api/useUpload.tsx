const UPLOAD_URL = (import.meta as any).env.VITE_UPLOAD_URL;
export const useUpload = () => {
  const uploadImage = async (data: File) => {
    try {
      const formData = new FormData();
      formData.append('file', data);
      const response = await fetch(`${UPLOAD_URL}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      } else {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return { uploadImage };
};
