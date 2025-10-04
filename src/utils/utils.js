// Форматирование времени в MM:SS
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Расчет процента оставшегося времени (от 100% до 0%)
export const getProgressPercentage = () => {
  if (initialTime === 0) return 0;
  return (timeLeft / initialTime) * 100;
};
