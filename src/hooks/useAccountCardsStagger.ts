import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useAccountCardsStagger = (containerRef: RefObject<HTMLElement>) => {
  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".account-card");
      
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        {
          // y: 40,
          y: "calc(-100% - 32px)",
          // opacity: 0,
        },
        {
          y: 0,
          // opacity: 1,
          duration: 0.6,
          ease: "linear",
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );
};
