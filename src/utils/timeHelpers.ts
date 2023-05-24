export const getTimeDifferenceInMinutes = (timestamp?: string) => {
  if (!timestamp) return 0;
  const date = new Date(timestamp);
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime.getTime() - date.getTime();
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  return differenceInMinutes;
} 