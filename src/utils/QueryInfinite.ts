import { ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { api } from "@/lib/axios.api";
export async function QueryInfinite<
  TCbData,
  TParams = { skip: number; limit: number },
>({
  url,
  cb,
  params,
}: {
  url: string;
  cb: (data: TCbData) => void;
  params?: TParams;
}) {
  const result = await api.get<TCbData>(url, {
    withCredentials: true,
    params,
  });

  return cb(result.data);
}
