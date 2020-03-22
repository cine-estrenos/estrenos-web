import dayjs from 'dayjs';

export const parseDate = (date) => {
  const formattedDate = dayjs(date).format('dddd D [de] MMMM');
  return formattedDate[0].toUpperCase() + formattedDate.substr(1);
};
