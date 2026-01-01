export const optimizeCloudinaryUrl = (url: string): string => {
  if (!url) return '';
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
};
