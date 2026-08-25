export function charToTwoDigit(char) {
  const upperChar = char.toUpperCase();
  if (upperChar >= "A" && upperChar <= "Z") {
    const position = upperChar.charCodeAt(0) - 64;
    return position.toString().padStart(2, "0");
  }
  return "00";
}

export function twoDigitToChar(twoDigit) {
  const position = parseInt(twoDigit);
  if (position >= 1 && position <= 26) {
    return String.fromCharCode(position + 64);
  }
  return "";
}