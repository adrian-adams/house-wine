import 'dotenv/config'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2026-06-04',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
})

const IMAGES_DIR = path.join(__dirname, '../../data/images')
const OUTPUT_FILE = path.join(__dirname, '../../data/output/asset-map.json')

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg']

async function uploadImages() {
    const files = fs.readdirSync(IMAGES_DIR)

    let assetMap: Record<string, string> = {}
    if (fs.existsSync(OUTPUT_FILE)) {
        assetMap = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'))
        console.log(`📂 Loaded existing asset map with ${Object.keys(assetMap).length} entries`)
    }

    let uploadedCount = 0
    let skippedCount = 0
    let failedCount = 0
    let invalidCount = 0

    for (const file of files) {
        const ext = path.extname(file).toLowerCase()

        if (!VALID_EXTENSIONS.includes(ext)) {
            console.warn(`⚠️  Skipping ${file} - unsupported extension: ${ext || '(none)'}`)
            invalidCount++
            continue
        }

        if (assetMap[file]) {
            console.log(`⏭️  Skipping ${file} (already uploaded)`)
            skippedCount++
            continue
        }

        const filePath = path.join(IMAGES_DIR, file)
        console.log(`Uploading ${file}...`)

        try {
            const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
                filename: file
            })
            assetMap[file] = asset._id
            uploadedCount++
            console.log(`✅ ${file} → ${asset._id}`)
        } catch (error: any) {
            console.error(`❌ Failed to upload ${file}: ${error.message}`)
            failedCount++
        }
    }

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(assetMap, null, 2))

    console.log(`\n✅ Done`)
    console.log(`   Uploaded: ${uploadedCount}`)
    console.log(`   Skipped (already uploaded): ${skippedCount}`)
    console.log(`   Skipped (invalid extension): ${invalidCount}`)
    console.log(`   Failed: ${failedCount}`)
    console.log(`\nAsset map saved to ${OUTPUT_FILE}`)
}

uploadImages().catch(console.error)