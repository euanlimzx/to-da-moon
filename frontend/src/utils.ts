export function calculatePixelHeight(normalizedValue: number) {
  // Get the screen height (in pixels)
  const screenHeight = window.innerHeight;
  // Calculate and return the pixel height
  return screenHeight * normalizedValue;
}
