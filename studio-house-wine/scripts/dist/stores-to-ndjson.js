"use strict";
// studio-house-wine/scripts/stores-to-ndjson.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const CSV_FILE = path_1.default.join(__dirname, '../../data/content/stores.csv');
const ASSET_MAP_FILE = path_1.default.join(__dirname, '../../data/output/asset-map.json');
const OUTPUT_FILE = path_1.default.join(__dirname, '../../data/output/stores.ndjson');
const STORE_MAP_FILE = path_1.default.join(__dirname, '../../data/output/store-map.json');
const assetMap = JSON.parse(fs_1.default.readFileSync(ASSET_MAP_FILE, 'utf-8'));
const results = [];
const storeMap = {};
fs_1.default.createReadStream(CSV_FILE)
    .pipe((0, csv_parser_1.default)())
    .on('data', (row) => {
    const id = `stores-${row.storeKey.toLowerCase()}`;
    // Build image reference if exists
    const imageAssetId = row.imageFile?.trim() ? assetMap[row.imageFile.trim()] : undefined;
    if (row.imageFile?.trim() && !imageAssetId) {
        console.warn(`⚠️  No asset found for store image: ${row.imageFile}`);
    }
    const store = {
        _type: 'stores',
        _id: id,
        title: row.title,
        storeKey: row.storeKey,
        slug: {
            _type: 'slug',
            current: row.storeKey
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
        },
        about: row.about || undefined,
        email: row.email || undefined,
        location: (row.lat && row.lng) ? {
            _type: 'geopoint',
            lat: parseFloat(row.lat),
            lng: parseFloat(row.lng)
        } : undefined,
        imageUrl: imageAssetId ? {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: imageAssetId
            }
        } : undefined
    };
    // Remove undefined fields
    Object.keys(store).forEach(key => {
        if (store[key] === undefined)
            delete store[key];
    });
    storeMap[row.storeKey] = id;
    results.push(store);
})
    .on('end', () => {
    // Write stores NDJSON
    const ndjson = results.map(r => JSON.stringify(r)).join('\n');
    fs_1.default.mkdirSync(path_1.default.dirname(OUTPUT_FILE), { recursive: true });
    fs_1.default.writeFileSync(OUTPUT_FILE, ndjson);
    console.log(`✅ ${results.length} stores converted → ${OUTPUT_FILE}`);
    // Write store map for products script
    fs_1.default.writeFileSync(STORE_MAP_FILE, JSON.stringify(storeMap, null, 2));
    console.log(`✅ Store map saved → ${STORE_MAP_FILE}`);
});
/*
Commands to Run:

    1 → Compile
    npx tsc scripts/stores-to-ndjson.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

    2 → Convert CSV to NDJSON
    node scripts/dist/stores-to-ndjson.js

    3 → Import to Sanity
    npx sanity dataset import data/output/stores.ndjson --dataset production --replace
*/ 
