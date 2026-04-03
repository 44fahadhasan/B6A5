type PaginationInput = {
  totalItems: number;
  currentPage: number;
  limit: number;
};

export const getPaginationMeta = ({
  totalItems,
  currentPage,
  limit,
}: PaginationInput) => {
  const totalPage = Math.max(1, Math.ceil(totalItems / limit));

  const safePage = Math.max(1, Math.min(currentPage, totalPage));

  const start = totalItems === 0 ? 0 : (safePage - 1) * limit + 1;
  const end = Math.min(safePage * limit, totalItems);

  return {
    totalPage,
    safePage,
    start,
    end,
  };
};
