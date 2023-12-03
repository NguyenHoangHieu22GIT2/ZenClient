import { NotificationId } from "@/Types/Notification";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";

export function useMutationDeleteNotification() {
  const deleteNotificationMutation = useMutation({
    mutationKey: ["delete-notification"],
    mutationFn: async (notificationId: NotificationId) => {
      const result = await api.delete(`notifications/${notificationId}`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  return deleteNotificationMutation;
}
