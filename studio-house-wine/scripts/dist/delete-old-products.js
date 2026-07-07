"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@sanity/client");
const client = (0, client_1.createClient)({
    projectId: 'g5nz3uq4',
    dataset: 'production',
    apiVersion: '2026-06-04',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});
async function deleteOldProducts() {
    const oldDocs = await client.fetch(`*[_type == "product" && !(name match "product-*")]{ name }`);
    console.log(`Found ${oldDocs.length} old documents to delete`);
    for (const doc of oldDocs) {
        await client.delete(doc.name);
        console.log(`🗑️  Deleted ${doc.name}`);
    }
    console.log('✅ Done');
}
deleteOldProducts().catch(console.error);
// Run commands
/*

npx tsc scripts/delete-old-products.ts --outDir scripts/dist --module CommonJS --target ES2020 --esModuleInterop --skipLibCheck --resolveJsonModule

node scripts/dist/delete-old-products.js

*/ 
