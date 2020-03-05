export const convertLink = (htmlText: string) => {
  return htmlText.replace(/href="https:\/\/makoto-acu.com\/(.+)"/g, `href="/$1"`);
};
