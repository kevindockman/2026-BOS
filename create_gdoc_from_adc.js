const fs = require('fs');

const ADC_PATH = '/home/kevindockman/.config/gcloud/application_default_credentials.json';

async function main() {
  if (!fs.existsSync(ADC_PATH)) {
    console.error('ADC file not found at:', ADC_PATH);
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(ADC_PATH, 'utf8'));
  console.log('Refreshing token using ADC credentials...');

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
      grant_type: 'refresh_token'
    })
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    console.error('Failed to get access token:', tokenData);
    process.exit(1);
  }

  const accessToken = tokenData.access_token;
  console.log('Successfully retrieved fresh access token!');

  // Create Google Doc
  console.log('Creating Google Doc...');
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Boston & Portland, ME 5-Day Craft Beer, Seafood & Coastal Itinerary'
    })
  });

  const docData = await createRes.json();
  if (createRes.status !== 200) {
    console.error(`Status ${createRes.status}:`, docData);
    if (docData.error && docData.error.message.includes('insufficient authentication scopes')) {
      console.log('\n======================================================');
      console.log('⚠️ SCOPE AUTHORIZATION NEEDED');
      console.log('Please run the following command in your terminal to enable Google Docs permissions:');
      console.log('gcloud auth application-default login --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/drive.file"');
      console.log('======================================================\n');
    }
    process.exit(1);
  }

  const docId = docData.documentId;
  const docUrl = `https://docs.google.com/document/d/${docId}/edit`;

  console.log('Document created with ID:', docId);

  // Populate document content
  const fullText = `Boston & Portland, ME 5-Day Craft Beer, Seafood & Coastal Itinerary

Executive Summary & Trip Overview
This itinerary is tailored for a couples' trip from Tuesday, September 1 to Saturday, September 5, 2026, blending historic walking, world-famous New England craft beer, quintessential dive bars, fresh lobster shacks, harbor boat cruises, and coastal hiking.

Navigating Boston College Move-In Week (Sept 1)
September 1st is Boston's legendary apartment move-in day ("Allston Christmas"). Traffic around Storrow Drive, Fenway, Allston/Brighton, and Cambridge will be heavily congested.
- The No-Car Advantage: Staying at Marriott Boston Long Wharf on the harbor completely bypasses the student moving gridlock.
- Zero Rental Car Needed: Your entire journey uses walking, MBTA Subway ("T"), MBTA Harbor Ferries, the scenic Amtrak Downeaster train to Maine, and quick Ubers in Portland.

Selected Marriott Accommodations
- Boston (Sept 1-3, 2 Nights): Marriott Boston Long Wharf (Harborfront, steps from Aquarium T, North End, and harbor cruises).
- Portland, ME (Sept 3-5, 2 Nights): AC Hotel Portland Downtown/Waterfront (Fore Street in Old Port, sleek harborfront location).

Transit & Navigation Summary
- Logan Airport to Hotel: MBTA Blue Line directly to Aquarium Station (escalators into hotel lobby).
- Boston to Portland: Amtrak Downeaster from Boston North Station to Portland (~2.5 hrs, scenic cafe car with local brews).
- Portland Local: Old Port is 100% walkable. Quick 10-min Uber to Cape Elizabeth / Portland Head Light.

Day-by-Day Detailed Itinerary

Day 1: Tuesday, Sept 1 - Beacon Hill, Freedom Trail & North End Dives
- Morning/Check-in: Arrive at Marriott Boston Long Wharf. Drop luggage. Coffee at Gracenote Coffee or Thinking Cup.
- Afternoon Walking: Walk through Boston Public Garden & Beacon Hill (Acorn Street), then follow Freedom Trail to historic North End.
- Lunch: Neptune Oyster (hot buttered lobster roll) or James Hook & Co. (waterfront picnic).
- Late Afternoon Drink: Cross Charlestown Bridge or take $3.70 MBTA Ferry to Warren Tavern (built 1780).
- Dinner: The Daily Catch (squid ink pasta in skillet) or Row 34.
- Evening Pastry & Dives: Cannolis at Bova's Bakery (24/7 secret). Dive bar hop at The Tam or Biddy Early's.

Day 2: Wednesday, Sept 2 - Seaport Craft Beer, Harbor Cruise & Row 34
- Morning Coffee & Walk: Tatte Bakery & Cafe, stroll Boston Harborwalk.
- Mid-Day Cruise: Boston Harbor Sightseeing Cruise (90 mins) or MBTA Ferry to Spectacle Island for a 1-hour coastal trail hike with 360° views.
- Lunch & Craft Beer: Trillium Brewing Company (Fort Point roof deck) and Harpoon Brewery & Beer Hall (fresh pretzels & beer cheese).
- Dinner: Row 34 (Fort Point) - Peak raw bar and curated craft beer.
- Nightcap/Dive: Bukowski Tavern (Back Bay) or Sullivan's Tap (North Station).

Day 3: Thursday, Sept 3 - Amtrak Downeaster to Portland & Old Port Dives
- Morning: Coffee at Boston Public Market (George Howell Coffee & Union Square Donuts).
- 10:00 AM Train: Board Amtrak Downeaster at Boston North Station (~2.5 hrs).
- 12:30 PM Portland Arrival: Check into AC Hotel Portland Downtown/Waterfront.
- Lunch: Portland Lobster Co. (deck on the water, live music, fresh lobster).
- Afternoon Walking & Beer: Explore Old Port cobblestone streets and Harbor Fish Market. Visit East Bayside breweries: Rising Tide, Austin Street, and Belleflower.
- Dinner: Eventide Oyster Co. (brown butter lobster roll) or Highroller Lobster Co.
- Nightcap/Dives: Lincoln's (hidden underground $5 cash bar) and Rosie's.

Day 4: Friday, Sept 4 - Portland Head Light Coastal Hike & Beer Pilgrimage
- Morning Coffee: Tandem Coffee & Bakery (biscuits & pour-over) or Bard Coffee.
- Morning Hike & Lighthouse: Uber 10 mins to Fort Williams Park (Cape Elizabeth). Hike cliffside trails around Portland Head Light. Lunch at Bite Into Maine food truck.
- Afternoon Craft Beer Pilgrimage: Rideshare to Industrial Way: Allagash Brewing Company (Belgian sours & IPAs in outdoor garden), Foundation Brewing, and Definitive Brewing. Or visit Bissell Brothers at Thompson's Point.
- Dinner: Scales (Maine Wharf) - Pan-fried Haddock, Chowder, and harbor views.
- Nightcap: Bramhall (underground West End pub) or J's Oyster.

Day 5: Saturday, Sept 5 - Casco Bay Boat Cruise, Chowder & Return
- Morning Boat Cruise: Casco Bay Lines Mailboat Run (3-hour island ferry cruise) or ferry to Peaks Island for a 4-mile scenic loop walk.
- Lunch: Gilbert's Chowder House (clam chowder in sourdough bowl) or J's Oyster.
- Afternoon Return: Amtrak Downeaster back to Boston North Station for departure.

Estimated Budget Breakdown (Couple, 5 Days / 4 Nights)
- Hotels (4 Nights): $1,400 - $1,800
- Transit (T, Amtrak, Uber): $200 - $250 (Zero rental car & zero parking fees!)
- Food & Seafood: $650 - $850
- Craft Beer & Dives: $280 - $380
- Excursions/Boat Rides: $90 - $130
- Estimated Total: ~$2,620 - $3,410
`;

  await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: fullText
          }
        }
      ]
    })
  });

  console.log('\n======================================================');
  console.log('🎉 GOOGLE DOC CREATED & POPULATED SUCCESSFULLY!');
  console.log('======================================================');
  console.log('Direct Google Doc Link:\n');
  console.log(docUrl);
  console.log('\n======================================================\n');
}

main().catch(console.error);
