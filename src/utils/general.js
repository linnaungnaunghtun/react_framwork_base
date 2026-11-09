export const generateRandomVoucherId = (length = 10) => {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Combine all possible characters
  const allChars = uppercaseLetters + numbers;

  let voucherId = "";

  for (let i = 0; i < length; i++) {
    // Randomly select a character from the combined set
    const randomIndex = Math.floor(Math.random() * allChars.length);
    voucherId += allChars[randomIndex];
  }

  return voucherId;
};

export const today = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
