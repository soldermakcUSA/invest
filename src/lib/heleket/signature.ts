import { createHash } from "crypto";

export function createHeleketSignature(payload: string, secret: string) {
  return createHash("md5").update(`${payload}${secret}`).digest("hex");
}
