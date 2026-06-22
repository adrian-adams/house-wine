import { createClient } from '@sanity/client'

export const sanityClient = createClient({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2026-06-04'
});