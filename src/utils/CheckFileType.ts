// This is used for knowing if this is not an image but a popular type of file, we will show that popular
// type of file icon
export function checkFileTypeToUseIconOrImage(fileType: string) {
  console.log(fileType);
  if (
    fileType.includes(".document") ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "/wordIcon.png";
  } else if (
    fileType.includes(".sheet") ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "/excelIcon.png";
  } else if (
    fileType.includes("compressed") ||
    fileType === "application/x-zip-compressed"
  ) {
    return "/rarIcon.png";
  } else if (fileType.includes("pdf") || fileType === "application/pdf") {
    return "/pdfIcon.png";
  } else {
    return "";
  }
}
