import { useOnboardingFlowImageUrls } from "@/context/OnboardingFlowContext";
import { Fonts, Greys } from "@/design_components/design_system";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import { Testimonial as TestimonialModel } from "@/models/OnboardingFlow/model";
import { withOpacity } from "@/utils/color";
import styled from "styled-components";

export function Testimonial({
  screen_name,
  screen_subtitle,
  avatar_graphic_id,
  content,
}: TestimonialModel) {
  const imageUrl = useOnboardingFlowImageUrls()[avatar_graphic_id];
  return (
    <TestimonialLayout>
      <div className="author">
        <img src={imageUrl} />
        <div className="details">
          <p className="screen_name">{screen_name}</p>
          <p className="screen_subtitle">{screen_subtitle}</p>
        </div>
      </div>
      <div className="content">
        <MarkdownText>{content}</MarkdownText>
      </div>
    </TestimonialLayout>
  );
}

const TestimonialLayout = styled.div`
  background-color: ${Greys.White};
  height: 400px;
  border-radius: 45px;
  width: 100%;

  box-shadow: 0px 4px 4px 0px ${withOpacity(Greys.Grey7E, 0.25)};
  padding: 40px 30px;
  box-sizing: border-box;

  ${Fonts.Montserrat};
  font-size: 14px;
  font-weight: 500;
  color: ${Greys.Black} strong {
    font-weight: 700;
  }
  display: flex;
  flex-direction: column;

  .author {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .details {
      margin-left: 25px;

      .screen_name {
        ${Fonts.SFPro}
        font-weight: 600;
        font-size: 18px;
        color: ${Greys.Black};
        margin-block: 10px;
      }

      .screen_subtitle {
        ${Fonts.SFPro}
        font-weight: 500;
        font-size: 14px;
        color: ${Greys.Grey7B};
        margin-block: 10px;
      }
    }

    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
  }

  .content {
    flex-grow: 1;
    overflow-y: auto;

    p {
      margin-top: 0px;
    }
  }
`;
