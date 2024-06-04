export const cleanImgUrl = (urlString: string) =>
  urlString.replace(/[\[\]"]+/g, "");
