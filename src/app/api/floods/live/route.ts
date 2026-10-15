import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const response = await fetch('https://kashmirfloodwatch.com/RiverWatch.aspx', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const stations: any[] = [];

    // Extract table rows using regex to avoid heavy HTML parsing dependencies that crash Next.js
    const regex = /<b[^>]*>\s*([^<]+)\s*<\/b>.*?<td[^>]*>\s*([\d.]+\s*m)\s*<\/td>\s*<td[^>]*>\s*([^<]+)\s*<\/td>.*?<td[^>]*>\s*([\d.]+\s*Feet)\s*<\/td>\s*<td[^>]*>\s*([^<]+)\s*<\/td>/gs;
    
    let match;
    while ((match = regex.exec(html)) !== null) {
      const name = match[1].trim();
      const levelStrMeters = match[2].trim();
      const dateStr = match[3].trim();
      const levelStrFeet = match[4].trim();
      const timeStr = match[5].trim();
      
      const levelMeters = parseFloat(levelStrMeters.replace(/[^\d.-]/g, ''));
      const levelFeet = parseFloat(levelStrFeet.replace(/[^\d.-]/g, ''));

      stations.push({
        name,
        levelMeters: isNaN(levelMeters) ? null : levelMeters,
        levelFeet: isNaN(levelFeet) ? null : levelFeet,
        levelStrMeters,
        levelStrFeet,
        date: dateStr,
        time: timeStr,
        timestamp: `${dateStr} ${timeStr}`
      });
    }

    return NextResponse.json({
      success: true,
      count: stations.length,
      data: stations,
      source: "internal" // Disguised as requested
    });

  } catch (error: any) {
    console.error('Error fetching live flood data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch live sensor data'
    }, { status: 500 });
  }
}
