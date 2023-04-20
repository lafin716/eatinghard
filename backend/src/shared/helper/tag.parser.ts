const tagParser = (tags: string[]) => {
  return tags.flatMap((tag) => {
    const tokens = tag.split(',').map((token) => token.trim());
    return [...tokens].filter((token) => token.length > 0);
  });
};

export default tagParser;
