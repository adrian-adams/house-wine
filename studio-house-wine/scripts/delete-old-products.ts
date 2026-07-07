import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2026-06-04',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
})

async function deleteOldProducts() {
    const oldDocs: { _id: string }[] = await client.fetch(
        `*[_type == "product" && !(_id match "product-*")]{ _id }`
    )

    console.log(`Found ${oldDocs.length} old documents to delete`)

    for (const doc of oldDocs) {
        await client.delete(doc._id)
        console.log(`🗑️  Deleted ${doc._id}`)
    }

    console.log('✅ Done')
}

deleteOldProducts().catch(console.error)

// Run commands

/*

npx tsc scripts/delete-old-products.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

node scripts/dist/delete-old-products.js

*/