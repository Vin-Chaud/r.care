import {
  getGraphics,
  GraphicSection,
} from "@/models/OnboardingFlow/getGraphics";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

export async function getGraphicImageUrls(
  flow: OnboardingFlow,
  section: GraphicSection
) {
  const allImages = getGraphics(flow, section);
  return Object.fromEntries(
    await Promise.all(
      [...allImages].map(async (graphicId) => {
        const dataUrl = await loadImageAsBase64(graphicId);
        if (!dataUrl) return null;
        return [graphicId, dataUrl] as const;
      })
    ).then((entries) => entries.filter((entry) => entry != null))
  );
}
