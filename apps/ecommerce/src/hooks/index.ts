import type { RequestEventLoader } from "@builder.io/qwik-city";
import { lucia } from "@repo/auth";
import cookie from "cookie";

export const getSession = async (requestEvent: RequestEventLoader) => {
  const cookieStr = requestEvent.request.headers.get("cookie") || "";
  const cookieData = cookie.parse(cookieStr);

  const sessionId = cookieData[lucia.sessionCookieName];

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);

    requestEvent.cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    requestEvent.cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!sessionId) {
    // Redirigir a /login si no hay sesión
    throw requestEvent.redirect(302, "/login");
  }

  // Si hay sesión, continúa con la ejecución normal
  return { session: true };
};
