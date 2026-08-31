const fs = require('fs');
const path = require('path');
const docx = require('docx');

const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, ShadingType } = docx;

async function createDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "Boston & Portland, ME 5-Day Craft Beer, Seafood & Coastal Itinerary 🍻🦞⚓",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spaceAfter: { after: 300 }
          }),

          // Executive Summary Header
          new Paragraph({
            text: "Executive Summary & Trip Overview",
            heading: HeadingLevel.HEADING_1,
            spaceBefore: { before: 200 },
            spaceAfter: { after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun("This itinerary is tailored for a couples' trip from "),
              new TextRun({ text: "Tuesday, September 1 to Saturday, September 5, 2026", bold: true }),
              new TextRun(", blending historic walking, world-famous New England craft beer, quintessential dive bars, fresh lobster shacks, harbor boat cruises, and coastal hiking.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Move-in Context Callout Box
          new Paragraph({
            text: "🎓 Crucial Context: Navigating Boston College Move-In Week (Sept 1)",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 200 },
            spaceAfter: { after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun("September 1st is Boston's legendary apartment move-in day ('Allston Christmas'). Traffic around Storrow Drive, Fenway, Allston/Brighton, and Cambridge will be heavily congested.\n"),
              new TextRun({ text: "• The No-Car Advantage: ", bold: true }),
              new TextRun("Staying at Marriott Boston Long Wharf on the harbor completely bypasses student moving gridlock.\n"),
              new TextRun({ text: "• Zero Rental Car Needed: ", bold: true }),
              new TextRun("Your entire journey uses walking, MBTA Subway ('T'), MBTA Harbor Ferries, the scenic Amtrak Downeaster train to Maine, and quick Ubers in Portland.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Accommodations Section
          new Paragraph({
            text: "🏢 Selected Marriott Accommodations",
            heading: HeadingLevel.HEADING_1,
            spaceBefore: { before: 200 },
            spaceAfter: { after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. Boston (Sept 1–3, 2 Nights): ", bold: true }),
              new TextRun({ text: "Marriott Boston Long Wharf", bold: true, color: "005A9C" }),
              new TextRun("\n   • Situated directly on the harborfront over the Aquarium T Station.\n   • Steps from Boston Harbor City Cruises, Faneuil Hall, and North End.\n   • Sweeping ocean/city views, outdoor harbor walkway, and top-tier lounge.\n")
            ],
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "2. Portland, ME (Sept 3–5, 2 Nights): ", bold: true }),
              new TextRun({ text: "AC Hotel Portland Downtown/Waterfront", bold: true, color: "005A9C" }),
              new TextRun("\n   • Located on Fore Street right at Ocean Gateway in Old Port.\n   • Sleek European-inspired boutique vibe with harbor views.\n   • Steps from Casco Bay Ferry pier, top craft beer bars, and seafood shacks.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Day by Day Itinerary
          new Paragraph({
            text: "📍 Day-by-Day Detailed Itinerary",
            heading: HeadingLevel.HEADING_1,
            spaceBefore: { before: 250 },
            spaceAfter: { after: 150 }
          }),

          // Day 1
          new Paragraph({
            text: "Day 1: Tuesday, Sept 1 – Beacon Hill, Freedom Trail & North End Dives",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 150 },
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Morning / Check-In: ", bold: true }),
              new TextRun("Arrive at Marriott Boston Long Wharf. Drop luggage with bell desk. Grab coffee at Gracenote Coffee or Thinking Cup (Hanover St).\n"),
              new TextRun({ text: "• Afternoon Walking: ", bold: true }),
              new TextRun("Walk through Boston Public Garden & Beacon Hill (Acorn Street), then follow Freedom Trail to historic North End.\n"),
              new TextRun({ text: "• Lunch: ", bold: true }),
              new TextRun("Neptune Oyster (hot buttered lobster roll) or James Hook & Co. (waterfront picnic).\n"),
              new TextRun({ text: "• Late Afternoon Drink: ", bold: true }),
              new TextRun("Cross Charlestown Bridge (or take $3.70 MBTA Ferry) to Warren Tavern (built 1780, historic pub patronized by Paul Revere).\n"),
              new TextRun({ text: "• Dinner: ", bold: true }),
              new TextRun("The Daily Catch (squid ink pasta in hot skillet) or Row 34.\n"),
              new TextRun({ text: "• Evening Pastry & Dives: ", bold: true }),
              new TextRun("Cannolis at Bova's Bakery (24/7 local secret). Dive bar hop at The Tam or Biddy Early's.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Day 2
          new Paragraph({
            text: "Day 2: Wednesday, Sept 2 – Seaport Craft Beer, Harbor Cruise & Row 34",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 150 },
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Morning Coffee & Walk: ", bold: true }),
              new TextRun("Tatte Bakery & Cafe, stroll Boston Harborwalk.\n"),
              new TextRun({ text: "• Mid-Day Boat Cruise: ", bold: true }),
              new TextRun("Walk out hotel door to Boston Harbor Sightseeing Cruise (90 mins), or MBTA ferry to Spectacle Island for a 1-hour coastal trail hike with 360° skyline views.\n"),
              new TextRun({ text: "• Lunch & Craft Beer: ", bold: true }),
              new TextRun("Trillium Brewing Company (Fort Point roof deck) and Harpoon Brewery & Beer Hall (fresh pretzels & beer cheese).\n"),
              new TextRun({ text: "• Dinner: ", bold: true }),
              new TextRun("Row 34 (Fort Point) – Peak raw bar, lobster rolls, and curated craft beer.\n"),
              new TextRun({ text: "• Nightcap / Dive Bar: ", bold: true }),
              new TextRun("Bukowski Tavern (Back Bay) or Sullivan's Tap (North Station).")
            ],
            spaceAfter: { after: 200 }
          }),

          // Day 3
          new Paragraph({
            text: "Day 3: Thursday, Sept 3 – Amtrak Downeaster to Portland & Old Port Dives",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 150 },
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Morning: ", bold: true }),
              new TextRun("Coffee & breakfast at Boston Public Market (George Howell Coffee & Union Square Donuts).\n"),
              new TextRun({ text: "• 10:00 AM Amtrak Downeaster: ", bold: true }),
              new TextRun("10-min walk/Uber to North Station. Board Amtrak Downeaster to Portland (~2.5 hrs, scenic cafe car with local brews).\n"),
              new TextRun({ text: "• 12:30 PM Portland Arrival: ", bold: true }),
              new TextRun("Arrive at POR, 8-min Uber to AC Hotel Portland Downtown/Waterfront.\n"),
              new TextRun({ text: "• Lunch: ", bold: true }),
              new TextRun("Portland Lobster Co. (pier deck on the water, live music, fresh lobster).\n"),
              new TextRun({ text: "• Afternoon Walking & Beer: ", bold: true }),
              new TextRun("Stroll Old Port cobblestone streets and Harbor Fish Market. Head to East Bayside breweries: Rising Tide Brewing, Austin Street Brewery, and Belleflower Brewing.\n"),
              new TextRun({ text: "• Dinner: ", bold: true }),
              new TextRun("Eventide Oyster Co. (famous brown butter lobster roll) or Highroller Lobster Co.\n"),
              new TextRun({ text: "• Late Night Dives: ", bold: true }),
              new TextRun("Lincoln's (hidden underground $5 cash-only bar) and Rosie's.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Day 4
          new Paragraph({
            text: "Day 4: Friday, Sept 4 – Portland Head Light Coastal Hike & Beer Mecca Pilgrimage",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 150 },
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Morning Coffee: ", bold: true }),
              new TextRun("Tandem Coffee & Bakery (biscuits & pour-over) or Bard Coffee.\n"),
              new TextRun({ text: "• Morning Coastal Hike & Lighthouse: ", bold: true }),
              new TextRun("Uber 10 mins to Fort Williams Park (Cape Elizabeth). Hike cliffside trails around Portland Head Light. Lunch at Bite Into Maine food truck.\n"),
              new TextRun({ text: "• Afternoon Craft Beer Pilgrimage: ", bold: true }),
              new TextRun("Rideshare to Industrial Way: Allagash Brewing Company (Belgian sours & IPAs in outdoor garden), Foundation Brewing, and Definitive Brewing. Or visit Bissell Brothers at Thompson's Point.\n"),
              new TextRun({ text: "• Dinner: ", bold: true }),
              new TextRun("Scales (Maine Wharf) – Pan-fried Haddock, Chowder, and harbor views.\n"),
              new TextRun({ text: "• Nightcap: ", bold: true }),
              new TextRun("Bramhall (underground West End pub) or J's Oyster.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Day 5
          new Paragraph({
            text: "Day 5: Saturday, Sept 5 – Casco Bay Boat Cruise, Chowder & Return",
            heading: HeadingLevel.HEADING_2,
            spaceBefore: { before: 150 },
            spaceAfter: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Morning Boat Cruise: ", bold: true }),
              new TextRun("Casco Bay Lines Mailboat Run (3-hour island ferry cruise) or ferry to Peaks Island for a 4-mile scenic loop walk.\n"),
              new TextRun({ text: "• Lunch: ", bold: true }),
              new TextRun("Gilbert's Chowder House (clam chowder in sourdough bowl) or J's Oyster.\n"),
              new TextRun({ text: "• Afternoon Return: ", bold: true }),
              new TextRun("Take afternoon Amtrak Downeaster back to Boston North Station for departure.")
            ],
            spaceAfter: { after: 200 }
          }),

          // Budget Table
          new Paragraph({
            text: "💰 Final Budget Breakdown (Couple, 5 Days / 4 Nights)",
            heading: HeadingLevel.HEADING_1,
            spaceBefore: { before: 250 },
            spaceAfter: { after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun("• Hotels (4 Nights): $1,400 – $1,800 (Marriott Long Wharf + AC Hotel Portland)\n"),
              new TextRun("• Transit (T, Amtrak, Uber): $200 – $250 (Zero rental car & zero parking fees!)\n"),
              new TextRun("• Food, Lobster & Seafood: $650 – $850\n"),
              new TextRun("• Craft Beer & Dives: $280 – $380\n"),
              new TextRun("• Excursions / Boat Rides: $90 – $130\n"),
              new TextRun({ text: "• Estimated Total: ~$2,620 – $3,410", bold: true })
            ],
            spaceAfter: { after: 200 }
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'Boston_Portland_Trip_Itinerary.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Successfully generated .docx file at:', outputPath);
}

createDocx().catch(console.error);
