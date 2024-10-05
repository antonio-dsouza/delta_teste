import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileChange: (file: File | null) => void;
  file: File | string | null;
}

export default function Dropzone({ onFileChange, file }: DropzoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    onFileChange(acceptedFiles[0] || null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-lg ${
        file ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      <input {...getInputProps()} />
      {file ? (
        <p>{file.name}</p>
      ) : (
        <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
      )}
    </div>
  );
}
