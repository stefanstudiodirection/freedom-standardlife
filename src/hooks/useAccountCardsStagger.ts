import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useAccountCardsStagger = (
	containerRef: RefObject<HTMLElement>
) => {
	useGSAP(
		() => {
			const cards = containerRef.current?.querySelectorAll(".account-card");

			if (!cards || cards.length === 0) return;

			// Prvo odmah postavi poziciju
			gsap.set(cards, {
				yPercent: -100,
				y: -32,
			});

			// Pa onda animiraj
			gsap.to(cards, {
				y: 0,
        yPercent: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.15,
			});
		},
		{ scope: containerRef }
	);
};
