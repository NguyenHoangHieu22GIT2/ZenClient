export function checkImageType(file: File): file is File {
  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  ) {
    throw new Error("Should be of type Image:(.jpeg/.png/.jpg)");
  }
  return true;
}
