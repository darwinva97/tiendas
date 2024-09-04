import { lucia } from "@repo/auth";
import { qwikLuciaConfig } from "qwik-lucia";

export const { handleRequest } = qwikLuciaConfig(lucia);
