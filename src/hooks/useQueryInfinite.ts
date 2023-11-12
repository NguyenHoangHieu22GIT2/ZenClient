import { ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { api } from "@/lib/axios.api";
import { linkToQueryPosts } from "@/utils/LinkToQuery";
export async function useQueryInfinite<TCbData, TParams = {}>({
  url,
  cb,
  params,
}: {
  url: string;
  cb: (data: TCbData) => void;
  params: TParams;
}) {
  const result = await api.get<TCbData>(url, {
    withCredentials: true,
    params,
  });

  return cb(result.data);
}
