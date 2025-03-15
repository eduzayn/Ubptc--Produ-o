export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_FILE_TYPES = {
  photo: ["image/jpeg", "image/png"],
  id_document: ["image/jpeg", "image/png", "application/pdf"],
  address_proof: ["image/jpeg", "image/png", "application/pdf"],
  certificate: ["image/jpeg", "image/png", "application/pdf"],
};

export type FileValidationError = {
  type: "size" | "type";
  message: string;
};

export function validateFile(
  file: File,
  type: keyof typeof ALLOWED_FILE_TYPES,
): FileValidationError | null {
  if (file.size > MAX_FILE_SIZE) {
    return {
      type: "size",
      message: "O arquivo deve ter no máximo 5MB",
    };
  }

  if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
    return {
      type: "type",
      message: `Tipo de arquivo não permitido. Use ${ALLOWED_FILE_TYPES[type].map((t) => t.split("/")[1]).join(" ou ")}`,
    };
  }

  return null;
}
