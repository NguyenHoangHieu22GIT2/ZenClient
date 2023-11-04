type page = "" | "login" | "register" | "posts" | "friends" | `posts/:id`;

function getRoute(route: page, dynamic?: string) {
  return `/${route}/${dynamic}`;
}

const result = getRoute("login");
