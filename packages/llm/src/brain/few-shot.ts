import type { DomainExamples } from './types.js';

export const FEW_SHOT_NEWS = `## EXAMPLE CAROUSEL — News/Disaster (GREAT quality)

Content: 13 dead after 6.8 earthquake in Kumamoto, Japan. Mall collapsed. 3,600 troops deployed.
Domain: news

<presentation>
  <slide type="cover" id="slide-01" tag="BREAKING NEWS" headline="Shopping Center Collapses in Japan" subheadline="The Kumamoto earthquake nobody saw coming. You need to know." authorName="Editorial Desk" authorRole="Investigative Unit" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="SHOCKING DATA" headline="6.8 Mag. 13 Lives. Zero Warning." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="6.8" unit="mag" label="Earthquake magnitude" />
      <stat value="13" unit="lives" label="Confirmed deaths" />
      <stat value="6" unit="miles" label="Depth of quake" />
      <stat value="3,600" unit="troops" label="Personnel deployed" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="URGENT RESCUE" headline="What Happened in the First 24 Hours" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Mall collapse rescue" desc="Two women confirmed dead. Teams searching for trapped survivors." />
      <item num="2" title="3,600 troops deployed" desc="Self-defense forces searching affected areas immediately." />
      <item num="3" title="Nuclear facilities stable" desc="No abnormalities reported at nearby plants." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="TSUNAMI TRUTH" headline="Advisory Lifted. Panic Was Real." myth="The tsunami threat is ongoing and catastrophic." fact="Advisory was lifted. The immediate danger to your coast is gone." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="OFFICIAL STATEMENT" quote="We have already confirmed extensive damage, including casualties, collapsed buildings, damaged roads and fires" author="Takaichi Sanae" role="Japanese Prime Minister" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR NEXT STEP" headline="Know Someone in Kyushu?" subtext="Share this with anyone in the affected area. Information saves lives." actionLabel="Share now" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: STRUCTURE ONLY — do NOT copy these specific headlines. Cover leads with specific numbers. Telemetry contrasts multiple data points. Sequence tells a chronological story. CTA connects to the reader personally. All data comes from the content.`;

export const FEW_SHOT_POLITICS = `## EXAMPLE CAROUSEL — Politics/Investigation (GREAT quality)

Content: Fauci's leaked journals reveal private thoughts on COVID origins. 1,100 pages. Rand Paul released them. 10 of 12 scientists saw lab leak as possible.
Domain: politics

<presentation>
  <slide type="cover" id="slide-01" tag="THE HIDDEN FILES" headline="1,100 Pages They Tried to Bury" subheadline="Fauci's private journals. The truth is inside." authorName="Editorial Desk" authorRole="Investigative Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="THE EVIDENCE" headline="2 vs 10. The Debate Was Real" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="1,100" unit="pages" label="Leaked private journal documents" />
      <stat value="12" unit="scientists" label="On the February 1, 2020 call" />
      <stat value="10" unit="of 12" label="Saw lab leak as possible" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="WHAT HE WROTE" headline="What His Private Notes Actually Say" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Lab leak was possible" desc="10 of 12 scientists on the Feb 1 call thought deliberate insertion was possible." />
      <item num="2" title="Market was amplifier" desc="Fauci privately wrote the market spread the virus, didn't start it." />
      <item num="3" title="Trump frustration" desc="Fauci called Trump's rhetoric nonsense and an embarrassment." />
      <item num="4" title="Fame discomfort" desc="He tracked his celebrity status while writing he didn't like it." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="THE DECEPTION" headline="Public Said One Thing. Private Said Another." myth="The journals reveal a deliberate cover-up of lab-leak evidence." fact="The journals show scientists were genuinely divided, with no definitive proof of either origin." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="THE VERDICT" quote="We've probably never ever seen people so completely at odds with their private thoughts, and then publicly proclaiming the opposite of what they were truly saying in private." author="Rand Paul" role="Republican Senator" footerLeft="SENATE TESTIMONY" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR TURN" headline="The Files Are Public. Read Them." subtext="1,100 pages are public. Form your own opinion." actionLabel="Share your thoughts" socialHandle="@PaperOfRecord" footerLeft="THE FINAL WORD" footerRight="PAGE 06" />
</presentation>

Notice: STRUCTURE ONLY — do NOT copy these specific headlines. Cover uses a specific number to create curiosity. Telemetry uses contrast. Sequence reveals hidden details. CTA empowers the reader. All facts come from the content brief.`;

export const FEW_SHOT_FINANCE = `## EXAMPLE CAROUSEL — Finance/Business (GREAT quality)

Content: S&P 500 drops 2.3% as Fed signals rate hike. NVIDIA earnings beat estimates. Oil prices surge 5%.
Domain: finance

<presentation>
  <slide type="cover" id="slide-01" tag="MARKET ALERT" headline="S&P Drops 2.3%. Your Portfolio Feels It." subheadline="Fed signals rate hike. NVIDIA beats estimates. Oil surges 5%." authorName="Markets Desk" authorRole="Financial Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="SHOCKING DATA" headline="2.3% Down. 5% Up. Your Move." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="2.3" unit="%" label="S&P 500 decline" />
      <stat value="5" unit="%" label="Oil price surge" />
      <stat value="12" unit="%" label="NVIDIA earnings beat" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="MARKET MOVES" headline="3 Forces Driving Markets Right Now" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Fed rate decision" desc="Powell signals 50bp hike incoming. Markets brace for impact." />
      <item num="2" title="NVIDIA crushes estimates" desc="AI demand drives revenue up 12%. Data center breaks records." />
      <item num="3" title="Oil supply crunch" desc="OPEC cuts production. Brent hits $95." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="TRUTH BOMB" headline="Rate Hikes Kill Stocks. Or Do They?" myth="Higher rates always crash the market." fact="In 7 of the last 10 rate hike cycles, the S&P 500 was positive 12 months later." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="The market has already priced in two more hikes. What matters now is the language around forward guidance." author="Dr. Sarah Chen" role="Goldman Sachs Chief Strategist" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR MOVE" headline="Protect Your Portfolio Today." subtext="Get real-time market alerts before the next Fed meeting." actionLabel="Follow for alerts" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover leads with the specific loss (2.3%) to create personal stakes. Telemetry contrasts the drop with the surge. Sequence breaks down the three forces. CTA uses urgency around the Fed meeting. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_HEALTH = `## EXAMPLE CAROUSEL — Health/Wellness (GREAT quality)

Content: New study shows 40% of adults over 40 have pre-diabetes. Sleep deprivation linked to heart disease. Mediterranean diet reduces risk by 35%.
Domain: health

<presentation>
  <slide type="cover" id="slide-01" tag="HEALTH ALERT" headline="40% of Adults Over 40. Pre-Diabetic." subheadline="Sleep deprivation linked to heart disease. Mediterranean diet cuts risk 35%." authorName="Health Desk" authorRole="Medical Investigation" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="SHOCKING DATA" headline="40% Pre-Diabetic. 35% Risk Cut." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="40" unit="%" label="Adults over 40 pre-diabetic" />
      <stat value="35" unit="%" label="Risk reduction with diet" />
      <stat value="2x" unit="risk" label="Heart disease from poor sleep" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="WHAT YOU CAN DO" headline="3 Changes That Save Lives" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Sleep 7+ hours" desc="Heart disease risk doubles with less than 6 hours nightly." />
      <item num="2" title="Adopt Mediterranean diet" desc="Olive oil, fish, vegetables — reduces diabetes risk 35%." />
      <item num="3" title="Get screened now" desc="Pre-diabetes is reversible if caught early." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="MYTH BUSTED" headline="You're Not Fat. You're Pre-Diabetic." myth="Pre-diabetes only affects overweight people." fact="40% of normal-weight adults over 40 have pre-diabetes too." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="The pre-diabetes epidemic is silent. Most people don't know they have it until it's too late." author="Dr. Maria Santos" role="Endocrinologist, Mayo Clinic" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR HEALTH" headline="Check Your Risk Now." subtext="Take the pre-diabetes risk assessment. It takes 2 minutes." actionLabel="Take the test" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover uses specific percentage (40%) to create personal stakes. Telemetry contrasts the problem with the solution. Sequence provides actionable steps. CTA drives immediate action. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_TECH = `## EXAMPLE CAROUSEL — Technology (GREAT quality)

Content: Apple Vision Pro 2 announced with $2,499 price. AI coding tools now write 40% of code. Quantum computing milestone at 1,000 qubits.
Domain: tech

<presentation>
  <slide type="cover" id="slide-01" tag="TECHNOLOGY" headline="Apple's $2,499 Bet on Reality" subheadline="Vision Pro 2. AI writes 40% of code. Quantum hits 1,000 qubits." authorName="Tech Desk" authorRole="Innovation Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="DISRUPTION" headline="$2,499. 40% Code. 1,000 Qubits." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="2,499" unit="$" label="Vision Pro 2 price" />
      <stat value="40" unit="%" label="Code written by AI" />
      <stat value="1,000" unit="qubits" label="Quantum computing milestone" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="WHAT CHANGES" headline="3 Shifts Reshaping Tech Right Now" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Spatial computing goes mainstream" desc="Apple bets big on mixed reality. Developers scramble." />
      <item num="2" title="AI replaces junior devs" desc="Coding tools now write 40% of production code." />
      <item num="3" title="Quantum breaks barriers" desc="1,000 qubits means real-world drug discovery." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="REALITY CHECK" headline="AI Won't Replace You. Someone Using AI Will." myth="AI will replace all programmers." fact="AI writes 40% of code, but humans still architect, test, and deploy." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="The developers who thrive will be those who learn to collaborate with AI, not compete against it." author="Andrej Karpathy" role="Former Tesla AI Director" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR FUTURE" headline="Adapt or Get Left Behind." subtext="Get weekly tech intelligence on what matters for your career." actionLabel="Follow for updates" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover uses the specific price point ($2,499) for curiosity. Telemetry uses three concrete numbers. Sequence breaks down the three shifts. CTA creates career urgency. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_ENTERTAINMENT = `## EXAMPLE CAROUSEL — Entertainment (GREAT quality)

Content: Taylor Swift announces surprise album. Marvel's new movie breaks opening weekend record. Netflix raises prices 15%.
Domain: entertainment

<presentation>
  <slide type="cover" id="slide-01" tag="ENTERTAINMENT" headline="Taylor Swift's Surprise. Netflix's Price." subheadline="Marvel breaks records. Streaming wars heat up." authorName="Culture Desk" authorRole="Entertainment Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="BY THE NUMBERS" headline="Record Weekend. 15% Hike. 24 Hours." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="15" unit="%" label="Netflix price increase" />
      <stat value="$380" unit="M" label="Marvel opening weekend" />
      <stat value="24" unit="hrs" label="Swift album announcement to release" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="WHAT MATTERS" headline="3 Entertainment Stories You Need" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Swift drops surprise album" desc="24-hour turnaround. Fans lose their minds. Streaming records shatter." />
      <item num="2" title="Marvel dominates box office" desc="$380M opening weekend. Biggest ever for the franchise." />
      <item num="3" title="Netflix raises prices" desc="15% hike. Ad tier becomes the value play." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="INDUSTRY TRUTH" headline="Streaming Is Cheap. Until Now." myth="Netflix is the affordable option." fact="Price increases have outpaced inflation for 5 straight years." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="CULTURE" quote="The surprise album drop has become the most powerful marketing tool in music." author="Music Industry Analyst" role="Billboard" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="STAY IN THE KNOW" headline="Never Miss a Drop." subtext="Get entertainment alerts before everyone else." actionLabel="Follow for drops" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover teases two stories. Telemetry uses three concrete numbers. Sequence breaks down the three stories. CTA uses "drops" language for fan engagement. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_SPORTS = `## EXAMPLE CAROUSEL — Sports (GREAT quality)

Content: LeBron James announces retirement after 22 seasons. Kansas City Chiefs win third Super Bowl in 5 years. Olympics ban 3 countries for doping.
Domain: sports

<presentation>
  <slide type="cover" id="slide-01" tag="SPORTS" headline="LeBron's Last Stand. 22 Seasons." subheadline="Chiefs three-peat. Three countries banned from Olympics." authorName="Sports Desk" authorRole="Athletic Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="BY THE NUMBERS" headline="22 Years. 3 Titles. 3 Bans." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="22" unit="years" label="LeBron's career" />
      <stat value="3" unit="titles" label="Chiefs Super Bowl wins" />
      <stat value="3" unit="countries" label="Olympics doping bans" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="LEGACY" headline="3 Stories That Define This Era" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="LeBron walks away" desc="22 seasons. 4 championships. The greatest career ever?" />
      <item num="2" title="Chiefs three-peat" desc="Mahomes and Reid cement dynasty status." />
      <item num="3" title="Olympics clean house" desc="Three countries banned for systemic doping." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="DEBATE" headline="GOAT Debate. Settled." myth="LeBron is the greatest ever because of stats." fact="Jordan has 6 titles in 6 finals. LeBron has 4 in 10. Context matters." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="LEGACY" quote="I came from Akron. I leave as someone who tried to bring a city with me." author="LeBron James" role="NBA Legend" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR ERA" headline="Remember This Moment." subtext="Follow for sports stories that define our time." actionLabel="Follow for legacy" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover teases the biggest story. Telemetry uses three numbers that define the era. Sequence breaks down the three stories. CTA creates nostalgia. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_ENVIRONMENT = `## EXAMPLE CAROUSEL — Environment (GREAT quality)

Content: Amazon deforestation drops 40% after new enforcement. Arctic sea ice hits record low. Coral reef restoration shows 60% success rate.
Domain: environment

<presentation>
  <slide type="cover" id="slide-01" tag="CLIMATE CRISIS" headline="60% Success. Arctic Hits Record Low." subheadline="Amazon deforestation drops 40%. Coral reefs fight back." authorName="Climate Desk" authorRole="Environmental Investigation" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="PLANET DATA" headline="60% Success. 40% Drop. Record Low." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="60" unit="%" label="Coral reef restoration success" />
      <stat value="40" unit="%" label="Amazon deforestation decrease" />
      <stat value="record" unit="low" label="Arctic sea ice extent" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="PLANET UPDATE" headline="3 Climate Stories That Matter" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Amazon recovery begins" desc="Enforcement works. Deforestation drops 40%." />
      <item num="2" title="Arctic crisis deepens" desc="Sea ice hits record low. Summer ice coming soon." />
      <item num="3" title="Coral reefs fight back" desc="60% restoration success gives hope." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="REALITY CHECK" headline="The Planet Is Warming. Here's the Proof." myth="Climate change is slowing down." fact="Arctic sea ice hit its lowest extent ever recorded this summer." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="The coral restoration data proves that when we act, nature responds. We just need to act faster." author="Dr. Emma Wilson" role="Marine Biologist" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR PLANET" headline="Act Before It's Too Late." subtext="Get climate intelligence on what you can do." actionLabel="Follow for climate" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover contrasts good news (60%) with bad (record low). Telemetry uses three data points. Sequence breaks down the three stories. CTA creates urgency. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_SCIENCE = `## EXAMPLE CAROUSEL — Science (GREAT quality)

Content: New CRISPR therapy cures sickle cell disease. James Webb telescope finds water on distant exoplanet. AI predicts earthquake 72 hours early.
Domain: science

<presentation>
  <slide type="cover" id="slide-01" tag="DISCOVERY" headline="72 Hours Early. Earthquake Predicted." subheadline="CRISPR cures sickle cell. Webb finds water on exoplanet." authorName="Science Desk" authorRole="Research Investigation" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="BREAKTHROUGH" headline="72 Hours. 100% Cure. 1 Water." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="72" unit="hours" label="Earthquake prediction window" />
      <stat value="100" unit="%" label="Sickle cell cure rate" />
      <stat value="1" unit="exoplanet" label="Water detected by Webb" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="THIS WEEK" headline="3 Breakthroughs That Change Everything" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Sickle cell cured" desc="CRISPR therapy achieves 100% remission in trials." />
      <item num="2" title="Water on alien world" desc="Webb telescope confirms water vapor in exoplanet atmosphere." />
      <item num="3" title="AI predicts earthquakes" desc="72-hour advance warning could save thousands." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="SCIENCE TRUTH" headline="AI Can't Predict Earthquakes. Or Can It?" myth="Earthquakes are impossible to predict." fact="New AI models achieve 85% accuracy with 72-hour advance warning." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="This is the first time we've achieved true cure, not just management, for sickle cell disease." author="Dr. Jennifer Doudna" role="Nobel Laureate, CRISPR Pioneer" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR FUTURE" headline="Science Is Moving Fast." subtext="Get breakthrough science delivered weekly." actionLabel="Follow for science" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover uses the most dramatic breakthrough (72-hour prediction). Telemetry uses three concrete numbers. Sequence breaks down the three breakthroughs. CTA creates wonder. Headlines use Title Case. All data comes from the content.`;

export const FEW_SHOT_FOOD = `## EXAMPLE CAROUSEL — Food/Drink (GREAT quality)

Content: Plant-based meat sales surge 45%. Michelin stars awarded to 3 new vegan restaurants. Coffee prices hit 10-year high.
Domain: food

<presentation>
  <slide type="cover" id="slide-01" tag="FOOD" headline="45% Surge. 3 Stars. 10-Year High." subheadline="Plant-based meat goes mainstream. Vegan fine dining. Coffee prices soar." authorName="Food Desk" authorRole="Culinary Analysis" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="FOOD DATA" headline="45% Up. 3 Stars. Decade High." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 02">
    <stats>
      <stat value="45" unit="%" label="Plant-based meat sales increase" />
      <stat value="3" unit="restaurants" label="New vegan Michelin stars" />
      <stat value="10" unit="year" label="Coffee price high" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="FOOD TRENDS" headline="3 Stories Shaping What You Eat" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 03">
    <items>
      <item num="1" title="Plant-based goes mainstream" desc="45% sales surge. Big Meat responds." />
      <item num="2" title="Vegan fine dining earns stars" desc="3 restaurants. Michelin validates the shift." />
      <item num="3" title="Coffee hits decade high" desc="Climate change meets supply chain crisis." />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="FOOD TRUTH" headline="Vegan Food Is Healthier. Not Always." myth="Plant-based always means healthier." fact="Many plant-based products are ultra-processed with higher sodium than meat." footerLeft="THE PAPER OF RECORD" footerRight="PAGE 04" />
  <slide type="quote" id="slide-05" tag="EXPERT VOICE" quote="The future of food isn't about replacing meat. It's about creating better options." author="Chef Daniel Boulud" role="Michelin-Starred Chef" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 05" />
  <slide type="cta" id="slide-06" tag="YOUR PLATE" headline="Know What You're Eating." subtext="Get food intelligence on trends, health, and industry." actionLabel="Follow for food" socialHandle="@PaperOfRecord" footerLeft="THE PAPER OF RECORD" footerRight="PAGE 06" />
</presentation>

Notice: Cover teases three trends with numbers. Telemetry uses three data points. Sequence breaks down the three stories. CTA creates awareness. Headlines use Title Case. All data comes from the content.`;

const FEW_SHOT_MAP: Record<string, string> = {
  news: FEW_SHOT_NEWS,
  politics: FEW_SHOT_POLITICS,
  finance: FEW_SHOT_FINANCE,
  health: FEW_SHOT_HEALTH,
  tech: FEW_SHOT_TECH,
  entertainment: FEW_SHOT_ENTERTAINMENT,
  sports: FEW_SHOT_SPORTS,
  environment: FEW_SHOT_ENVIRONMENT,
  science: FEW_SHOT_SCIENCE,
  food: FEW_SHOT_FOOD,
};
const DEFAULT_FEW_SHOT = FEW_SHOT_NEWS;

export function getDomainFewShot(domain?: DomainExamples): string {
  if (!domain) return DEFAULT_FEW_SHOT;
  const fewShotId = domain.fewShotId ?? domain.id;
  return FEW_SHOT_MAP[fewShotId] ?? DEFAULT_FEW_SHOT;
}
