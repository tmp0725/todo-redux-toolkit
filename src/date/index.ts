let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

export const today = `${year}${month < 10 ? "0" + month : month}${
  date < 10 ? "0" + date : date
}`;
