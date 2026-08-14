import { ReactNode } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

/** iPhone-style frame. Wrap a real screenshot:
 *  <PhoneFrame><img src={screenshot} alt="…" /></PhoneFrame> */
export const PhoneFrame = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      "relative w-[270px] shrink-0 rounded-[2.6rem] bg-foreground p-[10px] shadow-2xl shadow-primary/25",
      className
    )}
  >
    <div className="relative aspect-[1179/2556] overflow-hidden rounded-[2rem] bg-background [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
      {children}
    </div>
  </div>
);

/** Stylized illustration of the AI voice companion (no dedicated app screen
 *  exists yet — replace with a real screenshot when one is available). */
export const ScreenCompanion = () => (
  <div className="flex h-full flex-col bg-blasto-cream">
    <div className="px-5 pt-12 pb-3">
      <p className="text-[15px] font-bold text-foreground">Companion</p>
      <p className="text-[11px] text-muted-foreground">Voice & chat support</p>
    </div>
    <div className="flex-1 space-y-2.5 px-4">
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card px-3 py-2 text-[11px] leading-snug text-foreground shadow-sm">
        Your trigger shot is tonight at 9:00 PM. Feeling ready, or want to walk through it together?
      </div>
      <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md bg-blasto-rose-dark px-3 py-2 text-[11px] leading-snug text-white">
        A bit nervous. Can we go over the steps?
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card px-3 py-2 text-[11px] leading-snug text-foreground shadow-sm">
        Of course — one step at a time. First, take the pen out of the fridge…
      </div>
    </div>
    <div className="flex items-center justify-center gap-1.5 px-4 pb-3">
      {[10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 15].map((h, i) => (
        <span key={i} className="w-1 rounded-full bg-blasto-berry/70" style={{ height: `${h}px` }} />
      ))}
    </div>
    <div className="px-4 pb-6">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blasto-rose-dark shadow-lg shadow-primary/30">
        <Mic className="h-5 w-5 text-white" />
      </div>
    </div>
  </div>
);
