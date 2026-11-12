export interface ParsedBadge {
  raw: string;
  qualifier: string;  // e.g. "over", "under", "nearly", "approx.", "~", ">", "<"
  value: string;      // e.g. "5.2", "47.1B", "+18%", "1998", "$1.2T"
  unit: string;       // e.g. "million units", "users", "Billion"
}

const QUALIFIER_REGEX = /^(over|under|nearly|approx|approx\.|approximately|almost|more\s+than|less\s+than|\~|\>|\<|\>\=|\<\=|est\.?)$/i;

/**
 * Robustly parses an editorial metric badge string into structured parts.
 * Prevents array-to-string concatenation bugs and word repetition.
 *
 * Example:
 *   parseMetricBadge("over 5.2 million units")
 *   => { raw: "over 5.2 million units", qualifier: "over", value: "5.2", unit: "million units" }
 *
 *   parseMetricBadge("+18%")
 *   => { raw: "+18%", qualifier: "", value: "+18%", unit: "" }
 */
export function parseMetricBadge(rawBadge?: string | null): ParsedBadge {
  if (!rawBadge) {
    return { raw: '', qualifier: '', value: '', unit: '' };
  }
  const raw = String(rawBadge).trim();
  const tokens = raw.split(/\s+/);
  if (tokens.length === 0 || !tokens[0]) {
    return { raw, qualifier: '', value: '', unit: '' };
  }

  let qualifier = '';
  let restTokens = tokens;

  // Multi-token qualifiers like "more than", "less than"
  if (tokens.length >= 2 && /^(more\s+than|less\s+than)$/i.test(`${tokens[0]} ${tokens[1]}`)) {
    qualifier = `${tokens[0]} ${tokens[1]}`;
    restTokens = tokens.slice(2);
  } else if (QUALIFIER_REGEX.test(tokens[0])) {
    qualifier = tokens[0];
    restTokens = tokens.slice(1);
  }

  // Check if first token starts with an attached qualifier symbol: ~, >, <, >=, <=, ±
  if (!qualifier && restTokens[0]) {
    const symbolMatch = restTokens[0].match(/^([~><±]|>=|<=)(.+)$/);
    if (symbolMatch) {
      qualifier = symbolMatch[1] ?? '';
      restTokens = [symbolMatch[2] ?? '', ...restTokens.slice(1)];
    }
  }

  // Value is the primary numeric/metric token (guaranteed string, never array!)
  const value = restTokens[0] ?? '';
  const unit = restTokens.slice(1).join(' ');

  return { raw, qualifier, value, unit };
}
