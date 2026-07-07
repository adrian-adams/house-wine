"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const nanoid_1 = require("nanoid");
const CSV_FILE = path_1.default.join(__dirname, '../../data/content/products.csv');
const ASSET_MAP_FILE = path_1.default.join(__dirname, '../../data/output/asset-map.json');
const STORE_MAP_FILE = path_1.default.join(__dirname, '../../data/output/store-map.json');
const storeMap = JSON.parse(fs_1.default.readFileSync(STORE_MAP_FILE, 'utf-8'));
const OUTPUT_FILE = path_1.default.join(__dirname, '../../data/output/products.ndjson');
const assetMap = JSON.parse(fs_1.default.readFileSync(ASSET_MAP_FILE, 'utf-8'));
function toSlug(producer, name, vintage) {
    return `${producer}-${name}-${vintage}`
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .slice(0, 96);
}
function splitList(value) {
    if (!value || value.trim() === '')
        return [];
    return value.split(',').map(v => v.trim()).filter(Boolean);
}
function buildImages(imageFiles) {
    return splitList(imageFiles).map(filename => {
        const assetId = assetMap[filename];
        if (!assetId) {
            console.warn(`⚠️  No asset found for image: ${filename}`);
            return null;
        }
        return {
            _key: (0, nanoid_1.nanoid)(12),
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: assetId
            }
        };
    }).filter(Boolean);
}
function buildLogo(logoFiles) {
    if (!logoFiles || logoFiles.trim() === '')
        return undefined;
    const assetId = assetMap[logoFiles.trim()];
    if (!assetId) {
        console.warn(`⚠️  No asset found for logo: ${logoFiles}`);
        return undefined;
    }
    return {
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: assetId
        }
    };
}
function buildStoreRefs(storeValue) {
    return splitList(storeValue).map(key => {
        const storeId = storeMap[key];
        if (!storeId) {
            console.warn(`⚠️  No store found for key: ${key}`);
            return null;
        }
        return {
            _key: (0, nanoid_1.nanoid)(12),
            _type: 'reference',
            _ref: storeId
        };
    }).filter(Boolean);
}
const results = [];
fs_1.default.createReadStream(CSV_FILE)
    .pipe((0, csv_parser_1.default)())
    .on('data', (row) => {
    const slug = toSlug(row.producer, row.name, row.vintage);
    const product = {
        _type: 'product',
        _id: `product-${slug}`,
        name: row.name,
        slug: { _type: 'slug', current: slug },
        description: row.description,
        producer: row.producer,
        vintage: parseInt(row.vintage) || undefined,
        price: parseFloat(row.price) || undefined,
        availability: row.availability !== undefined && row.availability !== '' ? row.availability === 'true' : undefined,
        quantity: parseInt(row.quantity) || undefined,
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
    };
    const logo = buildLogo(row.logoFiles);
    if (logo)
        product.logo = logo;
    // Remove undefined/empty array keys for cleanliness
    Object.keys(product).forEach(key => {
        if (product[key] === undefined)
            delete product[key];
        if (Array.isArray(product[key]) && product[key].length === 0)
            delete product[key];
    });
    results.push(product);
})
    .on('end', () => {
    const ndjson = results.map(r => JSON.stringify(r)).join('\n');
    fs_1.default.mkdirSync(path_1.default.dirname(OUTPUT_FILE), { recursive: true });
    fs_1.default.writeFileSync(OUTPUT_FILE, ndjson);
    console.log(`✅ ${results.length} products converted → ${OUTPUT_FILE}`);
});
/*
Commands to Run:

    # 1 → Compile
    npx tsc scripts/products-to-ndjson.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

    # 2 → Convert CSV to NDJSON
    node scripts/dist/products-to-ndjson.js

    # 3 → Import to Sanity
    npx sanity dataset import data/output/products.ndjson --dataset production --replace
*/ 
