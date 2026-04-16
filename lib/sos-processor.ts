import { SOS_DATABASE, SOSRule } from './sos-database';

export interface SOSSample {
  labno: string;
  unitno: string;
  last_interpret_date: string;
  sampledate: string;
  processdate: string;
  evalcode: string;
  notesos: string;
  [key: string]: any;
}

export interface SOSResult {
  labno: string;
  unitno: string;
  interpretDate: string;
  sampleDate: string;
  processDate: string;
  evalCode: string;
  mainDesc: string;
  analysis: string;
  recommendation: string;
  failureMode: string;
  severity: string;
  fe: number;
  cu: number;
  pb: number;
  si: number;
  al: number;
  pq: number;
  na: number;
  wat: number;
  soot: number;
  v40: number;
  v100: number;
}

export function processSOSData(samples: SOSSample[]): SOSResult[] {
  return samples.map(sample => {
    const evalCode = (sample.evalcode || '').toUpperCase();
    let analysis = '';
    let recommendation = '';
    let failureMode = 'Normal';
    let severity = 'LOW';

    if (evalCode === 'C' || evalCode === 'X' || evalCode === 'B') {
      const result = generateRecommendation(sample);
      analysis = result.analysis;
      recommendation = result.recommendation;
      failureMode = result.failureMode;
      severity = result.severity;
    }

    const getVal = (key: string) => {
      const val = sample[key];
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const parsed = parseFloat(val.replace(/[<]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    return {
      labno: sample.labno,
      unitno: sample.unitno,
      interpretDate: sample.last_interpret_date,
      sampleDate: sample.sampledate,
      processDate: sample.processdate,
      evalCode: evalCode,
      mainDesc: sample.compart || '',
      analysis: analysis,
      recommendation: recommendation,
      failureMode: failureMode,
      severity: severity,
      fe: getVal('fe'),
      cu: getVal('cu'),
      pb: getVal('pb'),
      si: getVal('si'),
      al: getVal('al'),
      pq: getVal('pq'),
      na: getVal('na'),
      wat: getVal('wat'),
      soot: getVal('soot'),
      v40: getVal('v40'),
      v100: getVal('v100')
    };
  });
}

function generateRecommendation(sample: SOSSample): { analysis: string, recommendation: string, failureMode: string, severity: string } {
  const notes = (sample.notesos || '').toLowerCase();
  
  // 1. PARAMETER ANALYSIS
  const params: Record<string, { value: number, status: string }> = {};
  const checkParam = (key: string, threshold: number) => {
    const val = parseFloat(sample[key] || '0');
    if (val > threshold) {
      params[key] = { value: val, status: 'ABNORMAL' };
    }
  };

  checkParam('fe', 100);
  checkParam('cu', 50);
  checkParam('pb', 20);
  checkParam('si', 15);
  checkParam('al', 10);
  checkParam('pq', 50);
  checkParam('na', 20);
  checkParam('wat', 0.1);
  checkParam('soot', 1.0);

  const abnormalParams = Object.entries(params).map(([k, v]) => `${k.toUpperCase()}: ${v.value} (${v.status})`);

  // 2. PATTERN DETECTION
  const patterns: string[] = [];
  if (params.fe || params.cu || params.pb) patterns.push('WEAR (Fe/Cu/Pb detected)');
  if (params.si || params.al) patterns.push('CONTAMINATION (Dust/Dirt ingress)');
  if (params.na || params.wat) patterns.push('CONTAMINATION (Coolant/Water detected)');
  if (notes.includes('viscosity low') || notes.includes('viscosity is low')) patterns.push('LUBRICANT DEGRADATION (Low Viscosity)');
  if (notes.includes('soot is elevated')) patterns.push('LUBRICANT DEGRADATION (High Soot)');

  // 3. FAILURE MODE IDENTIFICATION
  const matchedRules: SOSRule[] = [];
  
  // Match based on keywords and parameters
  if (notes.includes('viscosity is low') || notes.includes('viscosity low')) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('Viscosity Oil Low'));
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('pc high') || params.pq) {
    const rule = SOS_DATABASE.find(r => r.issueParameter === 'PC HIGH' || r.issueParameter === 'PQ Increased');
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('dirt contamination') || params.si || params.al) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('Dirt Contamination'));
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('iron is high') || params.fe) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('Fe Increase'));
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('coolant contamination') || params.na || params.wat) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('Coolant Contamination'));
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('fuel dilution')) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('Fuel Dilution'));
    if (rule) matchedRules.push(rule);
  }
  if (notes.includes('soot is elevated') || params.soot) {
    const rule = SOS_DATABASE.find(r => r.issueParameter.includes('High Soot'));
    if (rule) matchedRules.push(rule);
  }

  // 4. SEVERITY ASSESSMENT
  let severity = 'LOW';
  const evalCode = (sample.evalcode || '').toUpperCase();
  if (evalCode === 'B') severity = 'MEDIUM';
  if (evalCode === 'C') severity = 'HIGH';
  if (evalCode === 'X') severity = 'CRITICAL';

  // Generate Final Recommendation
  const analysisReport = [
    '1. PARAMETER ANALYSIS:',
    abnormalParams.length > 0 ? abnormalParams.map(p => `   - ${p}`).join('\n') : '   - All parameters within normal range.',
    '',
    '2. PATTERN DETECTION:',
    patterns.length > 0 ? patterns.map(p => `   - ${p}`).join('\n') : '   - No significant patterns detected.',
    '',
    '3. FAILURE MODE IDENTIFICATION:',
    matchedRules.length > 0 ? Array.from(new Set(matchedRules.map(r => `   - ${r.issueParameter} (${r.maintId})`))).join('\n') : '   - No specific failure mode matched in database.',
    '',
    '4. SEVERITY ASSESSMENT:',
    `   - SEVERITY: ${severity}`
  ].join('\n');

  if (matchedRules.length === 0) {
    const suggestIndex = sample.notesos.toLowerCase().indexOf('suggested action:');
    if (suggestIndex !== -1) {
      const actionText = sample.notesos.substring(suggestIndex + 'suggested action:'.length).trim();
      return {
        analysis: analysisReport,
        recommendation: formatAsBullets(actionText),
        failureMode: patterns.length > 0 ? patterns[0] : 'Unknown',
        severity: severity
      };
    }
    return {
      analysis: analysisReport,
      recommendation: '- Continue sampling at the recommended interval.',
      failureMode: 'Normal',
      severity: severity
    };
  }

  const combinedRecs = matchedRules.map(rule => {
    const raw = rule.recommendationAus || rule.recommendationIdn || '';
    return raw.replace(/^(RECOMMENDATION|REQUIRED ACTIONS|Recommendation|ACTION REQUIRED)\s*[:\-]?\s*/i, '').trim();
  });

  const allBullets = new Set<string>();
  combinedRecs.forEach(rec => {
    const lines = rec.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    lines.forEach(line => {
      const cleaned = line.replace(/^[>\-\*]\s*/, '').trim();
      if (cleaned) allBullets.add(cleaned);
    });
  });

  return {
    analysis: analysisReport,
    recommendation: Array.from(allBullets).map(b => `- ${b}`).join('\n'),
    failureMode: matchedRules[0].issueParameter,
    severity: severity
  };
}

function formatAsBullets(text: string): string {
  // Simple heuristic to split sentences into bullets
  const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 5);
  if (sentences.length === 0) return text;
  return sentences.map(s => `- ${s}`).join('\n');
}
