import { sanityClient } from '../sanity';
import { FEATURES_FIELDS } from './fragments';

type FeatureTags = "powerfulFeatures"
type SectionTags = "section"

export async function getFeaturesByTag(tag:FeatureTags, field:SectionTags) {
    return await sanityClient.fetch(`
        *[_type == "features" && ${field} == "${tag}"] {
            ${FEATURES_FIELDS}
        }
    `)
}
