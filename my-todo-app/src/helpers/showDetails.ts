export const showDetails = (text: any) => {
  if (text && text?.length < 15) {
    return text;
  } else {
    return text?.slice(0, 15) + "...";
  }
};
