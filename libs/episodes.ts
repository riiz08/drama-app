const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL_SERVER
    : process.env.URL_SERVER_CLIENT;

export const getLatestEpisodes = async (page: any) => {
  const currentPage = Number(page) || 1;
  const limit = 10;
  const response = await fetch(
    `${baseUrl}/api/episodes/latest?page=${currentPage}&limit=${limit}`,
    { next: { revalidate: 300 } }
  );

  return response;
};
