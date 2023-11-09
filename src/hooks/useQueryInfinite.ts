import { ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { api } from "@/lib/axios.api";
import { linkToQueryPosts } from "@/utils/LinkToQuery";

export async function useQueryInfinite<T>(url: string, cb: (data: T) => void) {
  const result = await api.get<T>(url, {
    withCredentials: true,
  });

  return cb(result.data);
}
