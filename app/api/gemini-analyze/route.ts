import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { samples } = body;

    if (!samples || !Array.isArray(samples) || samples.length === 0) {
      return NextResponse.json({ error: 'No samples provided' }, { status: 400 });
    }

    // Build a compact summary of samples for the prompt
    const samplesText = samples.map((s: any, i: number) => {
      const evalCode = (s.evalcode || '').toUpperCase();
      return `[${i + 1}] LabNo:${s.labno} Unit:${s.unitno} Compartment:${s.compart || 'N/A'} EvalCode:${evalCode} Fe:${s.Fe ?? s.fe ?? 'N/A'} Cu:${s.Cu ?? s.cu ?? 'N/A'} Pb:${s.Pb ?? s.pb ?? 'N/A'} Si:${s.Si ?? s.si ?? 'N/A'} Al:${s.Al ?? s.al ?? 'N/A'} PQ:${s.PQ ?? s.pq ?? 'N/A'} V40:${s.V40 ?? s.v40 ?? 'N/A'} V100:${s.V100 ?? s.v100 ?? 'N/A'} WAT:${s.WAT ?? s.wat ?? 'N/A'} Notes:${(s.notesos || '').substring(0, 200)}`;
    }).join('\n');

    const prompt = `You are an expert oil analysis engineer specializing in heavy equipment (mining machinery, excavators, dump trucks, bulldozers). You will analyze Scheduled Oil Sampling (SOS) data and provide professional maintenance recommendations.

Analyze the following SOS samples and return a JSON array where each element corresponds to one sample (in the same order). For each sample, provide:
- "labno": the lab number (copy from input)
- "geminiAnalysis": a concise technical analysis (2-3 sentences max) identifying the main concern
- "geminiRecommendation": specific actionable maintenance steps as a plain text list (one action per line, start each with "- ")
- "geminiSeverity": one of "NORMAL", "MONITOR", "CAUTION", "CRITICAL"
- "geminiFailureMode": the primary failure mode in 3-5 words (e.g. "Excessive Fe Wear", "Dirt Contamination", "Coolant Ingress", "Viscosity Breakdown", "Normal Condition")
- "geminiConfidence": a number 0-100 representing your confidence in the diagnosis

Focus on:
- Eval codes: A/B = normal, C = caution (needs action), X = critical (immediate action)  
- High Fe = bearing/ring wear; High Cu = bushing wear; High Pb = bearing wear; High Si+Al = dirt ingress; High Na/WAT = coolant/water contamination; Low viscosity = oil degradation
- Prioritize samples with C and X eval codes

SOS Samples:
${samplesText}

Return ONLY a valid JSON array with no extra text, no markdown, no explanation. Example format:
[{"labno":"12345","geminiAnalysis":"...","geminiRecommendation":"- Step 1\\n- Step 2","geminiSeverity":"CAUTION","geminiFailureMode":"Fe Wear Detected","geminiConfidence":85}]`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini API error:', err);
      return NextResponse.json({ error: `Gemini API error: ${response.status}` }, { status: 502 });
    }

    const geminiData = await response.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '[]';

    let parsed: any[];
    try {
      parsed = JSON.parse(text);
    } catch {
      // Try to extract JSON array from text
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        parsed = [];
      }
    }

    return NextResponse.json({ results: parsed });
  } catch (error: any) {
    console.error('Route error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
