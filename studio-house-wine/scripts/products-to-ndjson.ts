import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { nanoid } from 'nanoid'

const CSV_FILE = path.join(__dirname, '../../data/content/products.csv')
const ASSET_MAP_FILE = path.join(__dirname, '../../data/output/asset-map.json')
const STORE_MAP_FILE = path.join(__dirname, '../../data/output/store-map.json')
const storeMap: Record<string, string> = JSON.parse(fs.readFileSync(STORE_MAP_FILE, 'utf-8'))
const OUTPUT_FILE = path.join(__dirname, '../../data/output/products.ndjson')

const assetMap: Record<string, string> = JSON.parse(fs.readFileSync(ASSET_MAP_FILE, 'utf-8'))

interface ProductRow {
    name: string
    producer: string
    vintage: string
    price: string
    availability: string
    country: string
    region: string
    vineyard: string
    classification: string
    wineType: string
    grapes: string
    bottleSize: string
    packaging: string
    fillLevel: string
    store: string
    labelCondition: string
    promoTag: string
    logoFiles: string
    imageFiles: string
}

function toSlug(producer: string, name: string, vintage: string) {
    return `${producer}-${name}-${vintage}`
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .slice(0, 96)
}

function splitList(value: string): string[] {
    if (!value || value.trim() === '') return []
    return value.split(',').map(v => v.trim()).filter(Boolean)
}

function buildImages(imageFiles: string) {
    return splitList(imageFiles).map(filename => {
        const assetId = assetMap[filename]
        if (!assetId) {
            console.warn(`⚠️  No asset found for image: ${filename}`)
            return null
        }
        return {
            _key: nanoid(12),
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: assetId
            }
        }
    }).filter(Boolean)
}

function buildLogo(logoFiles: string) {
    if (!logoFiles || logoFiles.trim() === '') return undefined

    const assetId = assetMap[logoFiles.trim()]
    if (!assetId) {
        console.warn(`⚠️  No asset found for logo: ${logoFiles}`)
        return undefined
    }
    return {
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: assetId
        }
    }
}

function buildStoreRefs(storeValue: string) {
    return splitList(storeValue).map(key => {
        const storeId = storeMap[key]
        if (!storeId) {
            console.warn(`⚠️  No store found for key: ${key}`)
            return null
        }
        return {
            _key: nanoid(12),
            _type: 'reference',
            _ref: storeId
        }
    }).filter(Boolean)
}

const results: any[] = []

fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on('data', (row: ProductRow) => {
        const slug = toSlug(row.producer, row.name, row.vintage)

        const product: any = {
            _type: 'product',
            _id: `product-${slug}`,
            name: row.name,
            slug: { _type: 'slug', current: slug },
            producer: row.producer,
            vintage: parseInt(row.vintage) || undefined,
            price: parseFloat(row.price) || undefined,
            availability: row.availability || undefined,
            country: row.country || undefined,
            region: row.region || undefined,
            vineyard: row.vineyard || undefined,
            classification: row.classification || undefined,
            wineType: row.wineType || undefined,
            grapes: splitList(row.grapes),
            bottleSize: row.bottleSize || undefined,
            packaging: row.packaging || undefined,
            fillLevel: row.fillLevel || undefined,
            store: buildStoreRefs(row.store),
            labelCondition: row.labelCondition || undefined,
            promoTag: splitList(row.promoTag),
            images: buildImages(row.imageFiles),
        }

        const logo = buildLogo(row.logoFiles)
        if (logo) product.logo = logo

        // Remove undefined/empty array keys for cleanliness
        Object.keys(product).forEach(key => {
            if (product[key] === undefined) delete product[key]
            if (Array.isArray(product[key]) && product[key].length === 0) delete product[key]
        })

        results.push(product)
    })
    .on('end', () => {
        const ndjson = results.map(r => JSON.stringify(r)).join('\n')
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
        fs.writeFileSync(OUTPUT_FILE, ndjson)
        console.log(`✅ ${results.length} products converted → ${OUTPUT_FILE}`)
    })


/* 
Commands to Run:

    # 1 → Compile
    npx tsc scripts/products-to-ndjson.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

    # 2 → Convert CSV to NDJSON
    node scripts/dist/products-to-ndjson.js

    # 3 → Import to Sanity
    npx sanity dataset import data/output/products.ndjson --dataset production --replace
*/