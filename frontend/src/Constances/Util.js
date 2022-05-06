

export const goTo = (url = "") => {
  url = window.location.origin + "/" + url;
  window.location.replace(url);
}

export const convertToPercent = (numberator, donominator) => {

  const percent = (numberator / donominator) * 100;

  const result = 100 - percent

  return result;

}

export const checkStatus = (type) => {
  switch (type) {
    case 'book':
      return 'Chưa thanh toán'
    case 'payment':
      return 'Đã thanh toán'
    case 'done':
      return 'Đã trả phòng'
    case 'cancel':
      return 'Đã hủy phòng'
    default:
      break;
  }
}


export const checkQualityRoom = (type) => {
  switch (type) {
    case 'basic':
      return "Phòng bình dân";
    case 'medium':
      return "Phòng tiêu chuẩn";
    case 'good':
      return "Phòng chất lượng cao";
    case 'luxury':
      return "Phòng hạng sang";
    default:
      break;
  }
}

export const checkTypeRoom = (type) => {
  switch (type) {
    case 'single':
      return "Giường đơn";
    case 'couple':
      return "Giường đôi";
    case 'king':
      return "Giường đơn king";
    case 'queen':
      return "Giường đơn queen";
    default:
      break;
  }
}