const fs = require('fs');
const http = require('http');
const url = require('url');

const CRED_FILE = '/home/kevindockman/.cache/google-vscode-extension/auth/application_default_credentials.json';
if (!fs.existsSync(CRED_FILE)) {
  console.error('Credential file not found at:', CRED_FILE);
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(CRED_FILE, 'utf8'));
const CLIENT_ID = creds.client_id;
const CLIENT_SECRET = creds.client_secret;
const PORT = 8085;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

const SCOPES = [
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.email'
].join(' ');

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope: SCOPES,
  access_type: 'offline',
  prompt: 'consent',
  login_hint: 'kevin.dockman@gmail.com'
}).toString();

console.log('\n======================================================');
console.log('🔑 GOOGLE OAUTH2 AUTHORIZATION REQUIRED');
console.log('======================================================');
console.log('Please open the following URL in your browser to authorize access for kevin.dockman@gmail.com:\n');
console.log(authUrl);
console.log('\n======================================================\n');

const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  if (reqUrl.pathname === '/oauth2callback') {
    const code = reqUrl.query.code;
    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>Authorization Failed</h1><p>No code received.</p>');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Authorization Successful!</h1><p>Creating your Google Doc now... Check your terminal!</p>');

    console.log('Received auth code. Exchanging for access token...');
    try {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI
        })
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        console.error('Failed to obtain token:', tokenData);
        process.exit(1);
      }

      console.log('Access token obtained successfully!');
      const accessToken = tokenData.access_token;

      // Check user email
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const userInfo = await userRes.json();
      console.log(`Authenticated User: ${userInfo.email}`);

      // Create Google Doc
      console.log('Creating new Google Document...');
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
      const docId = docData.documentId;
      const docUrl = `https://docs.google.com/document/d/${docId}/edit`;

      console.log('\n======================================================');
      console.log('🎉 GOOGLE DOC CREATED SUCCESSFULLY!');
      console.log('======================================================');
      console.log(`Document ID: ${docId}`);
      console.log(`Direct Google Doc URL: ${docUrl}`);
      console.log('======================================================\n');

      // Populate Content
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
- Afternoon Walking: Walk through Boston Public Garden & Beacon Hill (Acorn Street), then follow Freedom Trail to the historic North End.
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

      console.log('Document text populated successfully!');

      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 2000);

    } catch (err) {
      console.error('Error during document creation:', err);
      process.exit(1);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Local OAuth server running at http://localhost:${PORT}`);
});
