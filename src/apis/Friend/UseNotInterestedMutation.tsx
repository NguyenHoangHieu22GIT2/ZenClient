import { UserId } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";

export default function UseNotInterestedMutation() {
  const notInterestedMutation = useMutation({
    mutationKey: ["notInterested"],
    mutationFn: (data: UserId) => {
      return api
        .patch<UserId>(
          "friends/not-interested",
          {
            userId: data,
          },
          {
            withCredentials: true,
          },
        )
        .then((result) => {
          return result.data;
        });
    },
  });
  return notInterestedMutation;
}
