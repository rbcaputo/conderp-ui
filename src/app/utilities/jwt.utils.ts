import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  nameIdentifier?: string,
  name?: string,
  email?: string,
  role?: string
};

export function getJwtCookie(): string | null {
  const match: RegExpMatchArray | null = document.cookie.match(new RegExp("(^| )" + "auth_token" + "=([^;]+)"));

  return match
    ? decodeURIComponent(match[2])
    : null;
}

export function getTokenPayload(token: string | null): JwtPayload | null {
  try {
    if (!token)
      return null;

    const tokenPayload: Record<string, any> = jwtDecode<Record<string, any>>(token);

    return {
      nameIdentifier: tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      name: tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  } catch {
    return null;
  }
}
