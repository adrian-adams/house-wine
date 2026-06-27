"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@sanity/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client = (0, client_1.createClient)({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2026-06-04',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});
const IMAGES_DIR = path_1.default.join(__dirname, '../../data/images');
const OUTPUT_FILE = path_1.default.join(__dirname, '../../data/output/asset-map.json');
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
async function uploadImages() {
    const files = fs_1.default.readdirSync(IMAGES_DIR);
    let assetMap = {};
    if (fs_1.default.existsSync(OUTPUT_FILE)) {
        assetMap = JSON.parse(fs_1.default.readFileSync(OUTPUT_FILE, 'utf-8'));
        console.log(`📂 Loaded existing asset map with ${Object.keys(assetMap).length} entries`);
    }
    let uploadedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    let invalidCount = 0;
    for (const file of files) {
        const ext = path_1.default.extname(file).toLowerCase();
        if (!VALID_EXTENSIONS.includes(ext)) {
            console.warn(`⚠️  Skipping ${file} - unsupported extension: ${ext || '(none)'}`);
            invalidCount++;
            continue;
        }
        if (assetMap[file]) {
            console.log(`⏭️  Skipping ${file} (already uploaded)`);
            skippedCount++;
            continue;
        }
        const filePath = path_1.default.join(IMAGES_DIR, file);
        console.log(`Uploading ${file}...`);
        try {
            const asset = await client.assets.upload('image', fs_1.default.createReadStream(filePath), {
                filename: file
            });
            assetMap[file] = asset._id;
            uploadedCount++;
            console.log(`✅ ${file} → ${asset._id}`);
        }
        catch (error) {
            console.error(`❌ Failed to upload ${file}: ${error.message}`);
            failedCount++;
        }
    }
    fs_1.default.mkdirSync(path_1.default.dirname(OUTPUT_FILE), { recursive: true });
    fs_1.default.writeFileSync(OUTPUT_FILE, JSON.stringify(assetMap, null, 2));
    console.log(`\n✅ Done`);
    console.log(`   Uploaded: ${uploadedCount}`);
    console.log(`   Skipped (already uploaded): ${skippedCount}`);
    console.log(`   Skipped (invalid extension): ${invalidCount}`);
    console.log(`   Failed: ${failedCount}`);
    console.log(`\nAsset map saved to ${OUTPUT_FILE}`);
}
uploadImages().catch(console.error);
