// Helper functions
const base64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const blobToFile = (blobObj, fileName) => {
  blobObj.name = fileName;
  blobObj.lastModified = new Date();
  return new File([blobObj], fileName, { type: blobObj.type });
};

// Asuming you are into become:userFinishedSdk "Check, index.html for more information"
// This is a basic example, you can use react or another thecnology, approach for this
//button.addEventListener("become:userFinishedSdk", ({ detail }) => {
const blob = base64toBlob(detail.ReferenceImage.Bytes, "image/jpeg");
const file = new File([blob], "selfie.jpg", {
  type: "image/jpeg",
});

// Creating the form
const formData = new FormData();
formData.append("user_id", THE_USER_ID);
formData.append("image", file, "front.jpg");

try {
  const response = await fetch(
    `https://api.svi.becomedigital.net/api/v1/matches`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${acessToken}`,
      }),
      body: formData,
    }
  );

  console.log(response);
  /*
   * {
   *  "company": "<YOUR_COMPANY_ACCOUNT_NAME>",
   *  "user_id": "<USER_ID>",
   *  "result": false,
   *  "confidence": 0.20414
   * }
   */
} catch (error) {
  console.error(error);
}
// });
