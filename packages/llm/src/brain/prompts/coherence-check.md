You are an editorial reviewer. Check if these carousel slides are repetitive, filler, or tell a broken story.

## Generated Slides

{{{slidesXml}}}

## Checks to perform

1. **REPETITION**: Do any 2+ slides make the same argument in different words? Look for:
   - Headlines that express the same idea
   - Content that repeats the same point
   - Slides that could be merged into one without losing information

2. **FILLER SLIDES**: Are any slides padding that add no value? Examples:
   - Phonetic pronunciations of terms
   - Metadata like volume numbers, dates (unless content-relevant)
   - Slides that just say "here's what you should do" without substance

3. **NARRATIVE ARC**: Does the carousel tell a clear story?
   - **strong**: Clear beginning (hook), middle (builds), end (resolves/CTA)
   - **weak**: Some structure but feels random or unfocused
   - **broken**: No clear flow, slides feel disconnected

## Output Format

Return a JSON object:

```json
{
  "repetitions": [
    {
      "slide1": "slide-01",
      "slide2": "slide-03",
      "issue": "Both headlines express the same idea about X"
    }
  ],
  "fillerSlides": ["slide-02"],
  "narrativeArc": "strong | weak | broken",
  "verdict": "pass | retry | needs_review"
}
```

## Verdict rules
- **pass**: No repetitions, no filler, narrative is strong or weak (weak is acceptable)
- **retry**: 1-2 repetitions or filler slides that can be fixed by regenerating those specific slides
- **needs_review**: 3+ repetitions, broken narrative, or systemic issues

## Rules
- Focus on ARGUMENT repetition, not just similar words. Two slides can have different words but make the same point.
- A slide with only metadata or padding (dates, volume numbers, phonetic pronunciations) is filler.
- The CTA slide is allowed to reference the tool — only content slides must be article-specific.
- Return ONLY the JSON, no markdown fences, no explanation.
