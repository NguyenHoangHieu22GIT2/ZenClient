export const imageUrl = (avatar: string) => {
  if (avatar === "/default-user.jpeg" || avatar === "/avatar.jpeg")
    return avatar;
  return `${process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS}${avatar}`;
};
