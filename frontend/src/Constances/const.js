export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ONE_HOUR = 3600e3;
export const ONE_DAY = 24 * ONE_HOUR;
export const LOCALSTORAGE = {
  TOKEN: 'token',
  USER: 'user'
}

export const StatusOrder = [
  { value: "book", label: "Chờ thanh toán" },
  { value: "done", label: "Đã thanh toán" },
  { value: "cancel", label: "Đã hủy phòng" }
]

export const StatusRoom = [
  { value: "rent", label: "Đã cho thuê" },
  { value: "empty", label: "Phòng trống" },
]

export const TypeRoom = [
  { value: "single", label: "Phòng đơn" },
  { value: "couple", label: "Phòng đôi" },
]

export const QualityRoom = [
  { value: "basic", label: "Phòng bình dân" },
  { value: "medium", label: "Phòng tiêu chuẩn" },
  { value: "good", label: "Phòng chất lượng cao" },
  { value: "luxury", label: "Phòng hạng sang" }
]

export const EQUAL_ARRAY = (a, b) => {
  if (Array.isArray(a) == false || Array.isArray(b) == false) {
    return `${a} or ${b} not array`
  }
  if (a.length !== b.length) {
    return false;
  }
  const result = a.every((elA, index) => elA == b[index]);
  return result;
}

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

export function SetDefaultValueBirthday(str) {
  console.log(str)
  const [date, mon, year] = str.split("/").map(Number);
  return new Date(year, mon - 1, date).toLocaleDateString("fr-CA");
}

export function reformatDate(oldDate) {
    // ex input "2010-01-18"
  return oldDate?.split("-").reverse().join("/"); //ex out: "18/01/2010"
}