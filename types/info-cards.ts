import { BaseComponentsUI } from "./ui"

export type FeatureTags = "powerfulFeatures"
export type SectionTags = "section"

export interface InfoCardsUI extends BaseComponentsUI {
    title: string
    description: string
    imageUrl: string
    heading?: React.ElementType
}