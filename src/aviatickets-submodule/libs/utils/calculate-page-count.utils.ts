export const calculatePageCount = (totalItemsCount: number | null, pageSize: number): number => {
  if (!totalItemsCount) {
    return 0;
  }

  if (totalItemsCount < pageSize) {
    return 1;
  }

  return Math.ceil(totalItemsCount / pageSize);
};
