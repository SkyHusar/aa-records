// Consistent visible numbering without changing IDs, filenames, or player routing.
export const trackNumber = (position) => String(position).padStart(2, '0');
export const stripTrackPrefix = (title) => String(title).replace(/^\s*\d{1,3}\.\s+/, '');
export const originalSeriesNumber = (title) => {
  const match = String(title).match(/^\s*(\d{1,3})\.\s+/);
  return match ? Number(match[1]) : null;
};
