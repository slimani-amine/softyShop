export function calculateEstimatedDeliveryDate(): Date {
  const today = new Date();
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);

  const dayOfWeek = twoDaysLater.getDay();

  if (dayOfWeek === 5) {
    twoDaysLater.setDate(twoDaysLater.getDate() + 3);
  } else if (dayOfWeek === 6) {
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  } else if (dayOfWeek === 0) {
    twoDaysLater.setDate(twoDaysLater.getDate() + 1);
  }

  return twoDaysLater;
}
