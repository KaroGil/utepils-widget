// ── API-URL for api endpoint from utepils application: https://utepils-ten.vercel.app/ ────────────
const API_URL = "https://utepils-ten.vercel.app/api/utepils/bergen";

// ── Fetch ────────────────────────────────────────────────────────────────────
let data = null;
try {
  const req = new Request(API_URL);
  data = await req.loadJSON();
} catch (e) {
  data = null;
}

function makeGradient(score) {
  const g = new LinearGradient();
  g.startPoint = new Point(0, 0);
  g.endPoint   = new Point(1, 1);

  if (score >= 75) {
    g.colors    = [
      new Color("#fde68a"), 
      new Color("#fed7aa"), 
      new Color("#fef9c3"), 
    ];
    g.locations = [0, 0.5, 1];
  } else if (score >= 45) {
    g.colors    = [
      new Color("#bae6fd"), 
      new Color("#dbeafe"), 
      new Color("#f1f5f9"), 
    ];
    g.locations = [0, 0.5, 1];
  } else {
    g.colors    = [
      new Color("#cbd5e1"), 
      new Color("#e2e8f0"), 
      new Color("#f4f4f5"), 
    ];
    g.locations = [0, 0.5, 1];
  }

  return g;
}

// ── Build widget ─────────────────────────────────────────────────────────────
const widget = new ListWidget();

if (!data) {
  widget.backgroundColor = new Color("#f1f5f9");
  const err = widget.addText(":warning: Ingen data");
  err.font      = Font.systemFont(12);
  err.textColor = new Color("#888");
  Script.setWidget(widget);
  Script.complete();
  return;
}

const score   = data.score;
const emoji   = data.verdict.emoji;
const verdict = data.verdict;
const weather = data.weather;

widget.backgroundGradient = makeGradient(score);
widget.setPadding(14, 14, 14, 14);


const topRow = widget.addStack();
topRow.layoutHorizontally();
topRow.centerAlignContent();

const icon = topRow.addText(emoji);
icon.font = Font.systemFont(20);

topRow.addSpacer();

const cityLbl = topRow.addText(data.city);
cityLbl.font      = Font.boldSystemFont(11);
cityLbl.textColor = new Color("#374151", 0.8);

widget.addSpacer(8);

const cap = widget.addText("UTEPILS-SCORE");
cap.font      = Font.boldSystemFont(9);
cap.textColor = new Color("#374151", 0.6);

widget.addSpacer(2);

// ── Big score number ──────────────────────────────────────────────────────────
const scoreNum = widget.addText(score + "%");
scoreNum.font      = Font.boldSystemFont(38);
scoreNum.textColor = new Color("#111827");

widget.addSpacer(8);

// ── Progress bar ──────────────────────────────────────────────────────────────
const track = widget.addStack();
track.layoutHorizontally();
track.backgroundColor = new Color("#00000015");
track.cornerRadius    = 5;

const fill = track.addStack();
fill.backgroundColor = new Color("#11182740");
fill.cornerRadius    = 5;
for (let i = 0; i < score; i++) fill.addSpacer(0.72);

const empty = track.addStack();
empty.backgroundColor = new Color("#00000010");
empty.cornerRadius    = 5;
for (let i = 0; i < (100 - score); i++) empty.addSpacer(0.72);

widget.addSpacer(8);

// ── Verdict subtitle ──────────────────────────────────────────────────────────
const sub = widget.addText(verdict.subtitle);
sub.font               = Font.systemFont(11);
sub.textColor          = new Color("#374151");
sub.minimumScaleFactor = 0.75;

// ── Refresh every 30 min, can change to desired interval by changing out the 30 to your own defined number.  ─────
widget.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);

Script.setWidget(widget);
if (config.runsInApp) {
  await widget.presentSmall();
}
Script.complete();
