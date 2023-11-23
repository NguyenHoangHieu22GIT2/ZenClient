import { UserId } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";

export default function useFollowUserMutation() {
  const mutation = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: async (userId: UserId) => {
      return api
        .patch<any>("friends/toggle-follow-user", { userId: userId })
        .then((data) => {
          return data.data;
        });
    },
  });
  return mutation;
}
