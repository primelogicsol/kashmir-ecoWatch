async function check() {
  const r = await fetch('http://localhost:3000/biodiversity/threatened-species');
  console.log('Status:', r.status);
  const text = await r.text();
  console.log('Length:', text.length);
  const headings = [...text.matchAll(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings.slice(0, 15));
}
check().catch(console.error);
