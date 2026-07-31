import { getRandomPhoto, getPhotoUrl, getPlaceholderUrl } from '@loopreel/backgrounds';
import { downloadImage, uploadImage, getPresignedUrl } from '@loopreel/storage';

export async function fetchImagesForSlides(
  slides: Record<string, unknown>[],
  jobId: string,
): Promise<Record<string, unknown>[]> {
  return Promise.all(
    slides.map(async (slide, idx) => {
      const type = slide['type'] as string;
      if ((type === 'image-split' || type === 'image-cover') && slide['imageKeywords'] && !slide['imageUrl']) {
        try {
          const keywords = slide['imageKeywords'] as string;
          let imageUrl: string;

          try {
            const photo = await getRandomPhoto(keywords, { orientation: 'portrait' });
            const url = getPhotoUrl(photo, 'raw', 1080);
            const buffer = await downloadImage(url);
            const r2Key = await uploadImage(jobId, idx, buffer);
            imageUrl = await getPresignedUrl(r2Key);
          } catch {
            imageUrl = getPlaceholderUrl(keywords);
          }

          return { ...slide, imageUrl };
        } catch {
          return slide;
        }
      }
      return slide;
    }),
  );
}
