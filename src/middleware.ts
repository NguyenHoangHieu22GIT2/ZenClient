import { NextRequest, NextResponse } from "next/server";
const allow_origin_lists: string[] = ["http://localhost:3000"];

export default async function middleware(request: NextRequest) {
  // console.log("env", process.env.NODE_ENV);
  // console.log("Host", request.headers.get("host"));
  // console.log("Origin", request.headers.get("origin"));
  // console.log("Url", request.url);
  // console.log("Mehod:", request.method);


  const origin: string | null = request.headers.get("origin");
  const res = NextResponse.next();
  const res_404 = new NextResponse(null, {
    status: 404,
    statusText: "Bad request",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  // console.log(allow_origin_lists);
  if (origin && !allow_origin_lists.includes(origin)) {
    return res_404;
  }
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", origin!);
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return res;
}
