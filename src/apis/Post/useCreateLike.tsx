import { api } from '@/lib/axios.api';
import { useMutation } from '@tanstack/react-query';
import React from 'react'

export const useToggleLike = () => {
  const toggleLikeMutation = useMutation({
    mutationKey: ["post/like"],
    mutationFn: async (data: { postId: string }) => {
      return api
        .patch(process.env.NEXT_PUBLIC_SERVER_TOGGLE_LIKE_POST, data, {
          withCredentials: true,
        })
        .then((data) => data.data);
    },
  });
  return toggleLikeMutation
}
