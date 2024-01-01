import { UserId, zUserInfoPage, ztUserInfoPage } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { useQuery } from "@tanstack/react-query";

export const useQueryUserInfos = (userId: UserId) => {
  const useQueryUserInfos = useQuery({
    queryKey: ["queryInfos"],
    queryFn: async () => {
      return api
        .get<ztUserInfoPage>(`users/${userId}`, { withCredentials: true })
        .then((data) => {
          const parsedData = zUserInfoPage.parse(data.data);
          return parsedData;
        });
    },
  });
  return useQueryUserInfos;
};
