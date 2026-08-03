// scripts/cleanup-stale-products.ts
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

console.log('Token loaded:', process.env.SANITY_WRITE_TOKEN ? `${process.env.SANITY_WRITE_TOKEN.slice(0, 8)}...` : 'MISSING');

const client = createClient({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

const NDJSON_FILE = path.join(__dirname, '../../data/output/products.ndjson');
const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
    // 1. Get the set of valid IDs from your current, correct source of truth
    const lines = fs.readFileSync(NDJSON_FILE, 'utf-8').trim().split('\n');
    const validIds = new Set(lines.map(line => JSON.parse(line)._id));

    console.log(`✅ ${validIds.size} valid product IDs from products.ndjson`);

    // 2. Get every product doc currently in Sanity
    const allDocs: { _id: string }[] = await client.fetch(`*[_type == "product"]{ _id }`);
    console.log(`📦 ${allDocs.length} product documents currently in Sanity`);

    // 3. Diff — anything in Sanity but NOT in the valid set is stale
    const staleIds = allDocs.map(d => d._id).filter(id => !validIds.has(id));

    console.log(`🗑️  ${staleIds.length} stale documents to delete:`);
    staleIds.forEach(id => console.log(`   - ${id}`));

    if (DRY_RUN) {
        console.log('\n(dry run — nothing deleted, re-run without --dry-run to actually delete)');
        return;
    }

    if (staleIds.length === 0) return;

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