const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL_SERVER
    : process.env.URL_SERVER_CLIENT;

export const getPopularDrama = async () => {
  const response = await fetch(`${baseUrl}/api/drama/popular`, {
    next: { revalidate: 300 },
  });
  return response;
};
