let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();

export const currentTime: string = `${year}-${
  month < 10 ? "0" + month : month
}-${date < 10 ? "0" + date : date}`;
