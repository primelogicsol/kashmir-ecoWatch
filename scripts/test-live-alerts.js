async function test() {
  const res = await fetch('http://localhost:3000/api/alerts/live');
  const data = await res.json();
  console.log('Source:', data.source);
  console.log('Fetched At:', data.fetchedAt);
  console.log('Live Alert Count:', data.alerts.length);
  data.alerts.forEach((a, i) => {
    console.log(`\n[${i+1}] ${a.title}`);
    console.log(`    Category: ${a.category} | Severity: ${a.severity} | District: ${a.district}`);
    console.log(`    Issued By: ${a.issuedBy}`);
    console.log(`    Live Metrics: ${a.summary}`);
  });
}
test();
