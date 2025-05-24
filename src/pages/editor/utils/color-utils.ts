/**
 * Converts a hex color string to RGB format
 * @param hex Hex color string (e.g., "#ff0000")
 * @returns RGB color values as a string (e.g., "255, 0, 0")
 */
export const hexToRgb = (hex: string): string => {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Handle shorthand hex format (e.g., #fff)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Handle invalid hex values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn(`Invalid hex color: ${hex}`);
    return "0, 0, 0";
  }
  
  return `${r}, ${g}, ${b}`;
};

/**
 * Lightens a color by a specified percentage
 * @param color Hex color string (e.g., "#ff0000")
 * @param percent Percentage to lighten (e.g., 10 for 10%)
 * @returns Lightened hex color string
 */
export const lightenColor = (color: string, percent: number): string => {
  // Remove the # if present
  color = color.replace('#', '');
  
  // Handle shorthand hex format
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  
  // Parse the hex values
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  
  // Handle invalid hex values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn(`Invalid hex color: ${color}`);
    return "#000000";
  }
  
  // Lighten each component
  r = Math.min(255, Math.floor(r * (1 + percent / 100)));
  g = Math.min(255, Math.floor(g * (1 + percent / 100)));
  b = Math.min(255, Math.floor(b * (1 + percent / 100)));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Darkens a color by a specified percentage
 * @param color Hex color string (e.g., "#ff0000")
 * @param percent Percentage to darken (e.g., 10 for 10%)
 * @returns Darkened hex color string
 */
export const darkenColor = (color: string, percent: number): string => {
  // Remove the # if present
  color = color.replace('#', '');
  
  // Handle shorthand hex format
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  
  // Parse the hex values
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  
  // Handle invalid hex values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn(`Invalid hex color: ${color}`);
    return "#000000";
  }
  
  // Darken each component
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Checks if a color is light or dark
 * @param color Hex color string (e.g., "#ff0000")
 * @returns Boolean indicating if the color is light (true) or dark (false)
 */
export const isLightColor = (color: string): boolean => {
  // Remove the # if present
  color = color.replace('#', '');
  
  // Handle shorthand hex format
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  
  // Parse the hex values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Handle invalid hex values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn(`Invalid hex color: ${color}`);
    return false;
  }
  
  // Calculate the relative luminance
  // Formula: 0.299*R + 0.587*G + 0.114*B
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the color is light (luminance > 0.5)
  return luminance > 0.5;
};