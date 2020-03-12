export const extractTitle = (content: string): string => {
  return content.split(/\n/)[0];
};
