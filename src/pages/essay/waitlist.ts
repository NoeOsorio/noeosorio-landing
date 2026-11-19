import type { Lang } from "./content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const isValidEmail = (value: string) => {
  const v = normalizeEmail(value);
  return v.length >= 5 && v.length <= 200 && EMAIL_RE.test(v);
};

/** Saves one email to the waitlist. Firestore is loaded only when someone submits. */
export async function joinWaitlist(email: string, lang: Lang): Promise<void> {
  const [{ app }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
    import("../../config/firebase"),
    import("firebase/firestore"),
  ]);
  const db = getFirestore(app);
  await addDoc(collection(db, "essay_waitlist"), {
    email: normalizeEmail(email),
    lang,
    createdAt: serverTimestamp(),
  });
}
