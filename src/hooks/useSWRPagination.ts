import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useSWRPagination = <T>(url: string, options?: SWRInfiniteConfiguration) => {
  const PAGE_SIZE = 7;
  const getKey = (pageIndex: number, pervPageData: T[]) => {
    if (pervPageData && pervPageData.length < 3) {
      return null;
    }
    const queryStr = `?_order=desc&_sort=createdAt&_page=${
      pageIndex + 1
    }&_limit=${PAGE_SIZE}`;

    return `${url}${queryStr}`;
  };

  const { data, error, isValidating, size, setSize, mutate } =
    useSWRInfinite(getKey, options);
  //   console.log({ paginatedPosts, isValidating, size });

  const paginatedItems: T[] = data?.flat() ?? null;
  const isReachedAtLast = data && data[data.length - 1]?.length < PAGE_SIZE;

  const isLoading = paginatedItems && isValidating;

  return {
    paginatedItems,
    error,
    isValidating,
    size,
    setSize,
    mutate,
    isReachedAtLast,
    isLoading,
  };
};
