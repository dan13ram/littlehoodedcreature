import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel';
import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons';
import '../scss/embla.scss';

const EmblaCarouselComponent = ({ children }) => {
    const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollTo = useCallback(index => embla.scrollTo(index), [embla]);
    const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        setScrollSnaps(embla.scrollSnapList());
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <div className="embla">
            <EmblaCarouselReact className="embla__viewport">
                <div className="embla__container">
                    {children.map((child, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__inner">{child}</div>
                        </div>
                    ))}
                </div>
            </EmblaCarouselReact>
            {children.length >= 2 && (
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            selected={index === selectedIndex}
                            onClick={() => scrollTo(index)}
                            key={index}
                        />
                    ))}
                </div>
            )}
            {children.length >= 2 && (
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            )}
            {children.length >= 2 && (
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            )}
        </div>
    );
};

export default EmblaCarouselComponent;
