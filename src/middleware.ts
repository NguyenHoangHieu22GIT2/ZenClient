import { NextRequest, NextResponse } from "next/server";
const allow_origin_lists: string[] = ["http://localhost:3003"];

export default async function middleware(request: NextRequest) {
  // const { nextUrl, cookies } = request;
  // const jwtToken = cookies.get("jwtToken")?.value || "";
  // const userId = cookies.get("userId")?.value || "";
  // const { user } = await getServerSideUser(jwtToken, userId);
  // const routes = ["/login", "/register"];
  // console.log("routes:", nextUrl.pathname);
  // console.log(user.message && !routes.includes(nextUrl.pathname));
  // if (user.message && !routes.includes(nextUrl.pathname)) {
  //   return NextResponse.redirect("http://localhost:3000/login");
  // } else {
  //   return NextResponse.rewrite(
  //     new URL(`/?jwtToken=${JSON.stringify(user)}`, request.url),
  //   );
  // }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
