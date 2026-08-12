import type { Faq } from "./faqs";

/**
 * FAQs for the due date calculator. Rendered visibly by the page AND emitted
 * as FAQPage structured data — same single-source rule as the homepage FAQ,
 * because markup that doesn't match visible text is a spam signal.
 */
export const calculatorFaqs: Faq[] = [
  {
    q: "How is an IVF due date calculated?",
    a: "Pregnancy is dated as 280 days (40 weeks) from the last menstrual period, and the LMP is conventionally counted as 14 days before ovulation. In IVF, egg retrieval takes the place of ovulation, so the due date is 266 days after retrieval. An embryo transferred on day 5 was created 5 days before that transfer, which is why a day-5 transfer is dated 261 days out.",
  },
  {
    q: "Why is an IVF due date more accurate than a normal one?",
    a: "With natural conception, the date of ovulation is estimated from the last period and can be off by several days. With IVF, the date of fertilization is known exactly, so the dating has no such guesswork in it. Your due date is still an estimate of when labour begins, but the gestational age behind it is precise.",
  },
  {
    q: "Does a frozen transfer change the due date?",
    a: "No. What matters is the embryo's age at transfer, not how long it was frozen. A day-5 blastocyst transferred after two years in storage is dated exactly the same as a fresh day-5 transfer.",
  },
  {
    q: "How pregnant am I on transfer day?",
    a: "By obstetric dating, about two and a half weeks — 2w 5d for a day-5 transfer. This surprises most people. Gestational age is counted from the notional last period, which is two weeks before the embryo existed, so you start the count already partway along.",
  },
  {
    q: "What if my clinic gives me a different date?",
    a: "Go with your clinic. They may date from a slightly different convention or adjust after an early ultrasound, and they have your full history. This calculator uses the standard 266-day convention and is an estimate, not a medical record.",
  },
  {
    q: "Will my baby arrive on the due date?",
    a: "Probably not — only around 4% of babies are born on their estimated due date. Anything from 37 weeks is considered full term, and the due date is best understood as the middle of a range rather than an appointment.",
  },
];
