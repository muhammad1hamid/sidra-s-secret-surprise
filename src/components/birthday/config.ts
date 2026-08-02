/* ─────────────────────────────────────────────
   ▶ GLOBAL SETTINGS — edit these in one place
   ───────────────────────────────────────────── */

/** TESTING FLAG — set to `false` for the real launch so everything
 *  after the countdown stays locked until midnight of her birthday. */
export const DISABLE_MIDNIGHT_LOCK = true;

/** ▶ BIRTHDAY TARGET (month is 0-indexed: 7 = August) → August 5 */
export const getTarget = () => new Date(new Date().getFullYear(), 7, 5, 0, 0, 0);

/** Milliseconds left until the birthday, or 0 if it's already here. */
export const msUntilBirthday = () => Math.max(0, getTarget().getTime() - Date.now());

/** True once the countdown has hit zero (or when testing bypass is on). */
export const isUnlocked = () => DISABLE_MIDNIGHT_LOCK || msUntilBirthday() === 0;
