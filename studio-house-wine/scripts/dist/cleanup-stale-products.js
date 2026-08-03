"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/cleanup-stale-products.ts
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@sanity/client");
console.log('Token loaded:', process.env.SANITY_WRITE_TOKEN ? `${process.env.SANITY_WRITE_TOKEN.slice(0, 8)}...` : 'MISSING');
const client = (0, client_1.createClient)({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});
const NDJSON_FILE = path_1.default.join(__dirname, '../../data/output/products.ndjson');
const DRY_RUN = process.argv.includes('--dry-run');
async function main() {
    // 1. Get the set of valid IDs from your current, correct source of truth
    const lines = fs_1.default.readFileSync(NDJSON_FILE, 'utf-8').trim().split('\n');
    const validIds = new Set(lines.map(line => JSON.parse(line)._id));
    console.log(`✅ ${validIds.size} valid product IDs from products.ndjson`);
    // 2. Get every product doc currently in Sanity
    const allDocs = await client.fetch(`*[_type == "product"]{ _id }`);
    console.log(`📦 ${allDocs.length} product documents currently in Sanity`);
    // 3. Diff — anything in Sanity but NOT in the valid set is stale
    const staleIds = allDocs.map(d => d._id).filter(id => !validIds.has(id));
    console.log(`🗑️  ${staleIds.length} stale documents to delete:`);
    staleIds.forEach(id => console.log(`   - ${id}`));
    if (DRY_RUN) {
        console.log('\n(dry run — nothing deleted, re-run without --dry-run to actually delete)');
        return;
    }
    if (staleIds.length === 0)
        return;
    const tx = staleIds.reduce((t, id) => t.delete(id), client.transaction());
    await tx.commit();
    console.log(`✅ Deleted ${staleIds.length} stale documents.`);
}
main().catch(console.error);
/*

Script commands:

npx tsc scripts/cleanup-stale-products.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

node scripts/dist/cleanup-stale-products.js --dry-run

node scripts/dist/cleanup-stale-products.js

*/ 
