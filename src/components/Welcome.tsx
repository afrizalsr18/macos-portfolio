import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type JSX } from "react";
const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 700, default: 400 }
}
interface RenderTextProps {
    text: string;
    className: string;
    baseWeight?: number;
}

const renderText = (text: RenderTextProps['text'], className: RenderTextProps['className'], baseWeight: RenderTextProps['baseWeight'] = 400): JSX.Element[] => {
    return (
        [...text].map((char, index) => {
            return (
                <span key={index} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            );
        })
    );
};

const setupTextHover = (container: HTMLElement | null, type: keyof typeof FONT_WEIGHT): (() => void) => {
    if (!container) return () => { };

    const letters = container.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetter = (letter: HTMLSpanElement, weight: number, duration = 0.25) => {
        return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}` });
    }

    const handleMouseMove = (event: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = event.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 20000);
            animateLetter(letter, min + (max - min) * intensity);
        })
    };

    const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3))

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
}

const Welcome = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, 'title');
        const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

        return () => {
            subtitleCleanup();
            titleCleanup();
        };
    }, [])

    return (
        <section id='welcome'>
            <p ref={subtitleRef}>
                {renderText(
                    "im Zal, welcome to",
                    'text-3xl font-georama',
                    100
                )}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText("portfolio", 'text-7xl font-georama')}
            </h1>
            <div className="small-screen">
                <p> this portfolio is designed for desktop/tablet screen</p>
            </div>
        </section>
    )
}

export default Welcome