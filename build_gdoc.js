const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dock & Babs' Boston & Portland, ME 5-Day Executive Itinerary</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.45; color: #202124; max-width: 880px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 21pt; font-weight: bold; color: #1a73e8; margin-top: 10pt; margin-bottom: 4pt; text-align: center; }
    .subtitle { text-align: center; font-size: 10.5pt; color: #5f6368; margin-bottom: 16pt; font-style: italic; }
    h2 { font-size: 14pt; font-weight: bold; color: #1557d6; margin-top: 18pt; margin-bottom: 8pt; border-bottom: 2px solid #1a73e8; padding-bottom: 4pt; }
    h3 { font-size: 12pt; font-weight: bold; color: #202124; margin-top: 14pt; margin-bottom: 6pt; background-color: #e8f0fe; padding: 5pt 8pt; border-left: 4px solid #1a73e8; border-radius: 2px; }
    .callout { background-color: #f8f9fa; border-left: 4px solid #fbbc04; padding: 10pt 12pt; margin: 14pt 0; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 6pt; margin-bottom: 14pt; font-size: 9.5pt; }
    th { background-color: #1a73e8; color: #ffffff; padding: 7pt 8pt; text-align: left; font-weight: bold; border: 1px solid #1a73e8; }
    td { padding: 6pt 8pt; border: 1px solid #dadce0; vertical-align: middle; }
    tr:nth-child(even) { background-color: #f8f9fa; }
    .summary-row { background-color: #e8f0fe; font-weight: bold; color: #174ea6; }
    
    /* Badges */
    .badge-booked { background-color: #d4edda; color: #155724; font-weight: bold; padding: 2px 6px; border-radius: 3px; border: 1px solid #c3e6cb; font-size: 8.5pt; display: inline-block; }
    .badge-pending { background-color: #fff3cd; color: #856404; font-weight: bold; padding: 2px 6px; border-radius: 3px; border: 1px solid #ffeeba; font-size: 8.5pt; display: inline-block; }
    .badge-walkin { background-color: #e2e3e5; color: #383d41; font-weight: bold; padding: 2px 6px; border-radius: 3px; border: 1px solid #d6d8db; font-size: 8.5pt; display: inline-block; }
  </style>
</head>
<body>

  <h1>Dock &amp; Babs' Boston &amp; Portland, ME 5-Day Executive Itinerary 🍻🦞⚾✈️🐶</h1>
  <div class="subtitle">
    Travelers: Dock &amp; Babs (Kevin &amp; Alyssa) • Pup: Harvey (Western Wag) • Dates: Tuesday, Sept 1 – Saturday, Sept 5, 2026<br>
    Routing: Chicago (ORD) ➔ Boston (BOS) ➔ Amtrak Downeaster ➔ Portland (PWM) ➔ Chicago (ORD) • AA Non-Rev Standby ($0)
  </div>

  <h2>📋 Master Booking &amp; Reservation Status Dashboard</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 32%;">Event / Activity</th>
        <th style="width: 24%;">Date &amp; Time</th>
        <th style="width: 18%;">Status</th>
        <th style="width: 26%;">Confirmation / Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>🐶 Harvey Boarding (Western Wag)</strong></td>
        <td>Tue 9/1 @ 7am – Sat 9/5</td>
        <td><span class="badge-booked">✅ BOOKED</span></td>
        <td>$310 Total (Drop 7am Tue, pick up Sat AM)</td>
      </tr>
      <tr>
        <td><strong>✈️ Outbound AA Flight ORD ➔ BOS</strong></td>
        <td>Tue 9/1 @ 11:30 AM CDT</td>
        <td><span class="badge-booked">✅ CONFIRMED</span></td>
        <td>AA Non-Rev Standby ($0 benefit)</td>
      </tr>
      <tr>
        <td><strong>🏨 Moxy Boston Downtown</strong></td>
        <td>Tue 9/1 – Thu 9/3 (2 Nts)</td>
        <td><span class="badge-booked">✅ BOOKED</span></td>
        <td><strong>Conf #82416475</strong> ($660 Total)</td>
      </tr>
      <tr>
        <td><strong>⚾ Red Sox Game @ Fenway Park</strong></td>
        <td>Tue 9/1 @ 6:45 PM</td>
        <td><span class="badge-booked">✅ TICKETS IN HAND</span></td>
        <td>Confirmed Tickets for Kevin &amp; Alyssa</td>
      </tr>
      <tr>
        <td><strong>🌅 Boston Harbor Sunset Cruise</strong></td>
        <td>Wed 9/2 @ 6:00 PM – 7:45 PM</td>
        <td><span class="badge-booked">✅ BOOKED</span></td>
        <td><strong>Booking ID #33787328</strong> (Sunset Cruise)</td>
      </tr>
      <tr>
        <td><strong>🍽️ Row 34 Seafood Dinner (Boston)</strong></td>
        <td>Wed 9/2 @ 8:00 PM</td>
        <td><span class="badge-walkin">🚶 WALK-IN BAR / RESY</span></td>
        <td>383 Congress St (Full menu at walk-in oyster bar)</td>
      </tr>
      <tr>
        <td><strong>🚆 Amtrak Downeaster BOS ➔ POR</strong></td>
        <td>Thu 9/3 @ 11:50 AM – 2:20 PM</td>
        <td><span class="badge-booked">✅ BOOKED</span></td>
        <td>$90 Total ($45/ea with 1st Class upgrade)</td>
      </tr>
      <tr>
        <td><strong>🏨 Aloft Portland Waterfront</strong></td>
        <td>Thu 9/3 – Sat 9/5 (2 Nts)</td>
        <td><span class="badge-booked">✅ BOOKED</span></td>
        <td><strong>Conf #0GEI3O4SRI</strong> ($740 Total)</td>
      </tr>
      <tr>
        <td><strong>🍽️ Eventide Oyster Co. (Portland)</strong></td>
        <td>Thu 9/3 @ 6:30 PM</td>
        <td><span class="badge-walkin">🚶 WAITLIST / RESY</span></td>
        <td>Put name on digital text waitlist ~45 mins early</td>
      </tr>
      <tr>
        <td><strong>🍽️ Street &amp; Co. (33 Wharf St)</strong></td>
        <td>Fri 9/4 @ 5:00 PM</td>
        <td><span class="badge-booked">✅ CONFIRMED RESY</span></td>
        <td><strong>LOCKED &amp; LOADED!</strong> (Scales/Fore St team)</td>
      </tr>
      <tr>
        <td><strong>✈️ Return AA Flight PWM ➔ ORD</strong></td>
        <td>Sat 9/5 @ ~7:30 AM EDT</td>
        <td><span class="badge-booked">✅ CONFIRMED</span></td>
        <td>AA Non-Rev Standby ($0 benefit)</td>
      </tr>
    </tbody>
  </table>

  <h2>📍 Expanded Day-by-Day Time &amp; Cost Breakdown</h2>

  <!-- Day 1 -->
  <h3>Day 1: Tuesday, Sept 1 – Harvey Drop-Off, AA Flight, Moxy Check-In &amp; Red Sox Game @ Fenway!</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Time Window</th>
        <th style="width: 10%;">Duration</th>
        <th style="width: 28%;">Activity &amp; Location</th>
        <th style="width: 14%;">Status</th>
        <th style="width: 12%;">Cost</th>
        <th style="width: 16%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>7:00 AM – 7:30 AM</td><td>0.5 hrs</td><td><strong>🐶 Drop Harvey @ Western Wag</strong></td><td><span class="badge-booked">✅ BOOKED</span></td><td>Boarding</td><td>Drop at 7:00 AM opening.</td></tr>
      <tr><td>7:30 AM – 8:30 AM</td><td>1.0 hr</td><td><strong>Home Final Prep &amp; Packing</strong></td><td><span class="badge-walkin">🚶 N/A</span></td><td>Free</td><td>Double check bags &amp; lock up.</td></tr>
      <tr><td>8:30 AM – 9:30 AM</td><td>1.0 hr</td><td><strong>Transit to O'Hare (ORD)</strong></td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td><td>~$40</td><td>Uber from home / Western Ave to ORD.</td></tr>
      <tr><td>9:30 AM – 11:30 AM</td><td>2.0 hrs</td><td><strong>ORD Airport &amp; Boarding</strong></td><td><span class="badge-booked">✅ CONFIRMED</span></td><td>~$15</td><td>Clear TSA, morning coffee/gate.</td></tr>
      <tr><td>11:30 AM – 2:50 PM</td><td>2.33 hrs</td><td><strong>✈️ AA Flight ORD ➔ BOS</strong></td><td><span class="badge-booked">✅ CONFIRMED</span></td><td>Free ($0)</td><td>AA Standby Non-Rev (+1 hr shift).</td></tr>
      <tr><td>2:50 PM – 3:45 PM</td><td>1.0 hr</td><td><strong>Deplane &amp; Transit to Moxy</strong></td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td><td>Free / ~$20</td><td>Silver Line (free) or 15-min Uber.</td></tr>
      <tr><td>3:45 PM – 4:45 PM</td><td>1.0 hr</td><td><strong>Moxy Check-In &amp; Game Prep</strong></td><td><span class="badge-booked">✅ CONF #82416475</span></td><td>Hotel</td><td>Check in, welcome drink &amp; gear up!</td></tr>
      <tr><td>4:45 PM – 5:15 PM</td><td>0.5 hrs</td><td><strong>Green Line T to Fenway</strong></td><td><span class="badge-walkin">🚶 TAP &amp; GO</span></td><td>~$5</td><td>Boylston T straight to Kenmore (10 mins).</td></tr>
      <tr><td>5:15 PM – 6:45 PM</td><td>1.5 hrs</td><td><strong>Bleacher Bar &amp; Trillium Fenway</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$45</td><td>Center field window &amp; craft IPAs.</td></tr>
      <tr><td>6:45 PM – 9:45 PM</td><td>3.0 hrs</td><td><strong>⚾ RED SOX GAME @ FENWAY!</strong></td><td><span class="badge-booked">✅ TICKETS</span></td><td>~$60</td><td>Fenway Franks &amp; <em>Sweet Caroline</em>!</td></tr>
      <tr><td>9:45 PM – 11:30 PM</td><td>1.75 hrs</td><td><strong>Post-Game Dives &amp; Return</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$40</td><td>Pint at <em>Cask 'n Flagon</em> or <em>The Tam</em>.</td></tr>
      <tr class="summary-row"><td colspan="2"><strong>Day 1 Totals</strong></td><td colspan="3"><strong>16.5 Total Hours</strong></td><td><strong>~$205 (excl. hotel/flight)</strong></td></tr>
    </tbody>
  </table>

  <!-- Day 2 -->
  <h3>Day 2: Wednesday, Sept 2 – Freedom Trail, Seaport Breweries, 🌅 Sunset Harbor Cruise &amp; Row 34 Feast</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Time Window</th>
        <th style="width: 10%;">Duration</th>
        <th style="width: 28%;">Activity &amp; Location</th>
        <th style="width: 14%;">Status</th>
        <th style="width: 12%;">Cost</th>
        <th style="width: 16%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>8:30 AM – 9:45 AM</td><td>1.25 hrs</td><td><strong>Coffee &amp; Beacon Hill Walk</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$20</td><td>Coffee at <em>Thinking Cup</em>. Acorn St walk.</td></tr>
      <tr><td>9:45 AM – 12:00 PM</td><td>2.25 hrs</td><td><strong>Freedom Trail &amp; North End</strong></td><td><span class="badge-walkin">🚶 FREE WALK</span></td><td>Free</td><td>State House, Granary &amp; Faneuil Hall.</td></tr>
      <tr><td>12:00 PM – 1:45 PM</td><td>1.75 hrs</td><td><strong>North End Raw Bar Lunch</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$90</td><td><em>Neptune Oyster</em> (lobster roll) or <em>James Hook</em>.</td></tr>
      <tr><td>2:00 PM – 4:30 PM</td><td>2.5 hrs</td><td><strong>Trillium &amp; Harpoon Breweries</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$65</td><td>Roof deck IPAs &amp; fresh handmade pretzels.</td></tr>
      <tr><td>4:30 PM – 5:45 PM</td><td>1.25 hrs</td><td><strong>Moxy Refresh &amp; Change for Cruise</strong></td><td><span class="badge-booked">✅ HOTEL</span></td><td>Included</td><td>Freshen up and grab a light layer for boat.</td></tr>
      <tr><td>6:00 PM – 7:45 PM</td><td>1.75 hrs</td><td><strong>🌅 BOSTON HARBOR SUNSET CRUISE</strong></td><td><span class="badge-booked">✅ ID #33787328</span></td><td>Confirmed</td><td><strong>Golden Hour &amp; 7:18 PM Sunset!</strong> Drinks on deck.</td></tr>
      <tr><td>8:00 PM – 10:15 PM</td><td>2.25 hrs</td><td><strong>Dinner at Row 34 (383 Congress St)</strong></td><td><span class="badge-walkin">🚶 WALK-IN BAR</span></td><td>~$160</td><td>Walk-in oyster bar &amp; high tops serve full menu!</td></tr>
      <tr><td>10:15 PM – 11:30 PM</td><td>1.25 hrs</td><td><strong>Historic Dive Bar Crawl</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$35</td><td>Nightcap at <em>Biddy Early’s</em> or <em>The Tam</em>.</td></tr>
      <tr class="summary-row"><td colspan="2"><strong>Day 2 Totals</strong></td><td colspan="3"><strong>15.0 Total Hours</strong></td><td><strong>~$370 (excl. hotel/cruise)</strong></td></tr>
    </tbody>
  </table>

  <!-- Day 3 -->
  <h3>Day 3: Thursday, Sept 3 – Boston Morning, 11:50 AM Amtrak Downeaster &amp; Portland Waterfront</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Time Window</th>
        <th style="width: 10%;">Duration</th>
        <th style="width: 28%;">Activity &amp; Location</th>
        <th style="width: 14%;">Status</th>
        <th style="width: 12%;">Cost</th>
        <th style="width: 16%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>8:30 AM – 10:00 AM</td><td>1.5 hrs</td><td><strong>Leisurely Boston Breakfast</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$25</td><td>Breakfast at <em>Thinking Cup</em> or <em>Tatte</em>.</td></tr>
      <tr><td>10:00 AM – 11:15 AM</td><td>1.25 hrs</td><td><strong>Pack, Checkout &amp; Market Treats</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$15</td><td>*Boston Public Market* coffee &amp; donuts.</td></tr>
      <tr><td>11:15 AM – 11:45 AM</td><td>0.5 hrs</td><td><strong>Transit to North Station</strong></td><td><span class="badge-walkin">🚶 TAP &amp; GO</span></td><td>~$5</td><td>Orange Line T to North Station (BOS).</td></tr>
      <tr><td>11:50 AM – 2:20 PM</td><td>2.5 hrs</td><td><strong>🚆 AMTRAK DOWNEASTER (1st Class)</strong></td><td><span class="badge-booked">✅ BOOKED</span></td><td>$90</td><td>Scenic coastal train ride to Maine in 1st Class.</td></tr>
      <tr><td>2:20 PM – 2:50 PM</td><td>0.5 hrs</td><td><strong>Portland Arrival &amp; Aloft Check-In</strong></td><td><span class="badge-booked">✅ CONF #0GEI3O4SRI</span></td><td>~$12</td><td>8-min Uber to Aloft Portland Waterfront.</td></tr>
      <tr><td>2:50 PM – 4:15 PM</td><td>1.5 hrs</td><td><strong>Portland Lobster Co. Lunch</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$85</td><td>Pier deck over Casco Bay, live music &amp; lobster.</td></tr>
      <tr><td>4:15 PM – 6:30 PM</td><td>2.25 hrs</td><td><strong>East Bayside Brewery Tour</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$50</td><td>Hop between <em>Rising Tide</em>, <em>Austin St</em> &amp; <em>Belleflower</em>.</td></tr>
      <tr><td>6:30 PM – 8:30 PM</td><td>2.0 hrs</td><td><strong>Dinner at Eventide Oyster Co.</strong></td><td><span class="badge-walkin">🚶 WAITLIST</span></td><td>~$120</td><td>Brown butter lobster roll &amp; raw oyster flights.</td></tr>
      <tr><td>8:30 PM – 11:30 PM</td><td>3.0 hrs</td><td><strong>Old Port Dives &amp; Speakeasies</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$55</td><td><em>Lincoln’s</em> ($5 cash bar) &amp; <em>Rosie’s</em> pub.</td></tr>
      <tr class="summary-row"><td colspan="2"><strong>Day 3 Totals</strong></td><td colspan="3"><strong>15.0 Total Hours</strong></td><td><strong>~$362 (excl. hotel/train)</strong></td></tr>
    </tbody>
  </table>

  <!-- Day 4 -->
  <h3>Day 4: Friday, Sept 4 – Portland Head Light Coastal Hike, Beer Mecca Pilgrimage &amp; Street &amp; Co. Finale</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Time Window</th>
        <th style="width: 10%;">Duration</th>
        <th style="width: 28%;">Activity &amp; Location</th>
        <th style="width: 14%;">Status</th>
        <th style="width: 12%;">Cost</th>
        <th style="width: 16%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>8:30 AM – 9:30 AM</td><td>1.0 hr</td><td><strong>Tandem Coffee &amp; Bakery Morning</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$22</td><td>Pour-overs &amp; famous savory biscuits at <em>Tandem</em>.</td></tr>
      <tr><td>9:30 AM – 12:30 PM</td><td>3.0 hrs</td><td><strong>Portland Head Light Coastal Hike</strong></td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td><td>~$35</td><td>Fort Williams Park trails &amp; <em>Bite Into Maine</em> truck on-site.</td></tr>
      <tr><td>12:30 PM – 4:00 PM</td><td>3.5 hrs</td><td><strong>Industrial Way Brewery Pilgrimage</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$75</td><td><em>Allagash Brewing</em>, <em>Foundation</em>, <em>Definitive</em> &amp; <em>Bissell</em>.</td></tr>
      <tr><td>4:00 PM – 4:45 PM</td><td>0.75 hrs</td><td><strong>Waterfront Stroll &amp; Aloft Refresh</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>Free</td><td>Freshen up at Aloft &amp; stroll to Wharf St cobblestones.</td></tr>
      <tr><td>5:00 PM – 7:30 PM</td><td>2.5 hrs</td><td><strong>🍽️ Dinner at Street &amp; Co. (33 Wharf St)</strong></td><td><span class="badge-booked">✅ CONFIRMED (5PM)</span></td><td>~$160</td><td><strong>LOCKED &amp; LOADED!</strong> Lobster Fra Diavolo &amp; whole grilled fish.</td></tr>
      <tr><td>7:30 PM – 11:00 PM</td><td>3.5 hrs</td><td><strong>Old Port &amp; West End Dive Crawl</strong></td><td><span class="badge-walkin">🚶 WALK-IN</span></td><td>~$50</td><td>Nightcap at <em>Bramhall</em>, <em>Lincoln’s</em>, or <em>J's Oyster</em>.</td></tr>
      <tr class="summary-row"><td colspan="2"><strong>Day 4 Totals</strong></td><td colspan="3"><strong>14.5 Total Hours</strong></td><td><strong>~$342 (excl. hotel)</strong></td></tr>
    </tbody>
  </table>

  <!-- Day 5 -->
  <h3>Day 5: Saturday, Sept 5 – Morning Nonstop AA Flight PWM ➔ ORD &amp; Pick Up Harvey!</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Time Window</th>
        <th style="width: 10%;">Duration</th>
        <th style="width: 28%;">Activity &amp; Location</th>
        <th style="width: 14%;">Status</th>
        <th style="width: 12%;">Cost</th>
        <th style="width: 16%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>5:30 AM – 6:15 AM</td><td>0.75 hrs</td><td><strong>Checkout &amp; Transit to PWM</strong></td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td><td>~$15</td><td>Check out of Aloft. 10-min Uber to Portland Jetport.</td></tr>
      <tr><td>6:15 AM – 7:30 AM</td><td>1.25 hrs</td><td><strong>PWM Jetport &amp; Boarding</strong></td><td><span class="badge-booked">✅ CONFIRMED</span></td><td>~$12</td><td>Easy check-in, TSA screening &amp; coffee.</td></tr>
      <tr><td>7:30 AM – 9:15 AM</td><td>2.75 hrs</td><td><strong>✈️ AA Nonstop Flight PWM ➔ ORD</strong></td><td><span class="badge-booked">✅ CONFIRMED</span></td><td>Free ($0)</td><td>Earliest nonstop flight back to Chicago.</td></tr>
      <tr><td>9:15 AM – 10:00 AM</td><td>0.75 hrs</td><td><strong>Transit to Western Wag</strong></td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td><td>~$40</td><td>Uber from ORD directly to Western Wag.</td></tr>
      <tr><td>10:00 AM – 10:30 AM</td><td>0.5 hrs</td><td><strong>🐶 Pick Up Harvey &amp; Welcome Home!</strong></td><td><span class="badge-booked">✅ BOOKED</span></td><td>Boarding</td><td>Reunite with Harvey and head home!</td></tr>
      <tr class="summary-row"><td colspan="2"><strong>Day 5 Totals</strong></td><td colspan="3"><strong>5.0 Total Hours</strong></td><td><strong>~$67 (excl. flight/boarding)</strong></td></tr>
    </tbody>
  </table>

  <h2>💰 Master Budget Ledger (Dock &amp; Babs + Harvey)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 35%;">Budget Category</th>
        <th style="width: 25%;">Confirmed / Est. Cost</th>
        <th style="width: 40%;">Booking Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Boston Hotel (2 Nights @ Moxy)</strong></td><td>$660</td><td><span class="badge-booked">✅ CONF #82416475</span></td></tr>
      <tr><td><strong>Portland Hotel (2 Nights @ Aloft)</strong></td><td>$740</td><td><span class="badge-booked">✅ CONF #0GEI3O4SRI</span></td></tr>
      <tr><td><strong>Harvey's Boarding (Western Wag - 4 Nights)</strong></td><td>$310</td><td><span class="badge-booked">✅ BOOKED</span></td></tr>
      <tr><td><strong>Amtrak Downeaster (1st Class Upgrade)</strong></td><td>$90</td><td><span class="badge-booked">✅ BOOKED</span></td></tr>
      <tr><td><strong>Boston Harbor Sunset Cruise</strong></td><td>~$70</td><td><span class="badge-booked">✅ BOOKING #33787328</span></td></tr>
      <tr><td><strong>Street &amp; Co. Friday Dinner (5:00 PM)</strong></td><td>~$160</td><td><span class="badge-booked">✅ CONFIRMED RESY</span></td></tr>
      <tr><td><strong>Flights (ORD ➔ BOS &amp; PWM ➔ ORD)</strong></td><td>$0</td><td><span class="badge-booked">✅ CONFIRMED</span></td></tr>
      <tr><td><strong>Chicago &amp; Local Transit (Ubers + T)</strong></td><td>~$155</td><td><span class="badge-walkin">🚶 ON-DEMAND</span></td></tr>
      <tr><td><strong>Remaining Dining &amp; Lobster (Neptune, Row 34, Eventide)</strong></td><td>~$475</td><td><span class="badge-walkin">🚶 WALK-IN BAR / WAITLIST</span></td></tr>
      <tr><td><strong>Craft Beer &amp; Dive Bars</strong></td><td>~$415</td><td><span class="badge-walkin">🚶 WALK-IN</span></td></tr>
      <tr class="summary-row"><td><strong>GRAND TOTAL TRIP ESTIMATE</strong></td><td><strong>~$3,075</strong></td><td><strong>All-inclusive 5-day vacation ledger under $3.1k!</strong></td></tr>
    </tbody>
  </table>

</body>
</html>
`;

fs.writeFileSync('/home/kevindockman/kdock/2026-BOS/Itinerary.html', htmlContent);
console.log('Successfully updated Itinerary.html in 2026-BOS!');
