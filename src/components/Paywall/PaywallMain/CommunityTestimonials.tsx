import { HeaderB } from "@/components/Paywall/PaywallMain/common";
import { Testimonial } from "@/components/Testimonial";
import { globalContext } from "@/context/GlobalContext";
import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import { Fonts, Purples } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import { Disclaimer } from "@/design_components/typography";
import { Testimonial as TestimonialModel } from "@/models/OnboardingFlow/model";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export function CommunityTestimonials() {
  const model = useOnboardingFlow();
  const testimonials = model.community_testimonials.slice(0, 5);
  const disclaimer = model.testimonial_disclaimer;
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <ScrollablePageContentFrame background={Purples.PurpleF9}>
      <Layout>
        <header>
          <HeaderB>{"Hear from the binge eating community"}</HeaderB>
          <p className="subtitle">{"Recovery is possible with R.care"}</p>
        </header>
        <TestimonialCarousel testimonials={testimonials} />
        {disclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
      </Layout>
    </ScrollablePageContentFrame>
  );
}

function TestimonialCarousel({
  testimonials,
}: {
  testimonials: readonly TestimonialModel[];
}) {
  const rotationTime = useContext(globalContext).carouselRotationTime;
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialCount = testimonials.length;

  useEffect(() => {
    if (hasInteracted) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (currentTestimonialIndex) =>
          (currentTestimonialIndex + 1) % testimonialCount
      );
    }, rotationTime);
    return () => clearInterval(interval);
  }, [testimonialCount, hasInteracted]);

  const nextTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCount;
  const previousTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonialCount) % testimonialCount;

  return (
    <div>
      <CarouselContainer>
        {testimonials.map((testimonial, itemIndex) => {
          return (
            <TestimonialContainer
              key={itemIndex}
              mode={
                itemIndex === currentTestimonialIndex
                  ? "current"
                  : itemIndex === nextTestimonialIndex
                  ? "next"
                  : itemIndex === previousTestimonialIndex
                  ? "previous"
                  : "hidden"
              }
            >
              <Testimonial {...testimonial} />
            </TestimonialContainer>
          );
        })}
      </CarouselContainer>
      <CarouselButtonRow>
        {testimonials.map((_, index) => (
          <CarouselButton
            key={index}
            isSelected={index === currentTestimonialIndex}
            onClick={() => {
              setHasInteracted(true);
              setCurrentTestimonialIndex(index);
            }}
          />
        ))}
      </CarouselButtonRow>
    </div>
  );
}

const Layout = styled.section`
  padding-block: 25px;

  p.subtitle {
    ${Fonts.Montserrat}
    font-weight: 600;
    font-size: 14px;
    color: ${Purples.Purple94};
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 400px;
  margin-block: 40px;
`;

const TestimonialContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "mode",
})<{ mode: Mode }>`
  display: block;
  position: absolute;
  opacity: ${(props) => (props.mode === "current" ? 1 : 0)};
  left: 50%;
  width: 100%;
  transition: opacity 0.5s, transform 0.5s;
  transform: translateX(${getTranslation}%);
  overflow: visible;
  user-select: ${(props) => (props.mode == "current" ? "auto" : "none")};
  pointer-events: ${(props) => (props.mode == "current" ? "auto" : "none")};
`;

function getTranslation(props: { mode: Mode }) {
  switch (props.mode) {
    case "next":
      return 125 - 50;
    case "previous":
      return -125 - 50;
    default:
      return -50;
  }
}

type Mode = "next" | "previous" | "current" | "hidden";

const CarouselButtonRow = styled.div`
  margin-block: 40px;
  text-align: center;
`;

const CarouselButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? Purples.Purple94 : Purples.PurpleCA_Undocumented};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  margin-inline: 10px;
  cursor: pointer;
  font-size: ${
    // Horrible, horrible trick!
    // https://stackoverflow.com/questions/3777494/is-it-possible-to-override-the-minimum-width-of-a-button-in-safari-on-ipad
    0
  };
`;
