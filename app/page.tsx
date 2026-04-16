'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  HardDrive,
  Settings2,
  Table as TableIcon,
  Trash2,
  Play,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  TrendingUp,
  Search,
  Sparkles,
  RefreshCw,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Brain,
  Loader2
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { processSOSData, SOSSample, SOSResult } from '@/lib/sos-processor';
import { cn } from '@/lib/utils';

interface GeminiEnrichment {
  geminiAnalysis: string;
  geminiRecommendation: string;
  geminiSeverity: 'NORMAL' | 'MONITOR' | 'CAUTION' | 'CRITICAL';
  geminiFailureMode: string;
  geminiConfidence: number;
}

type EnrichedResult = SOSResult & Partial<GeminiEnrichment>;

type AppPhase = 'upload' | 'results';

const GEMINI_SEVERITY_COLORS: Record<string, string> = {
  NORMAL: 'bg-slate-200 text-slate-700',
  MONITOR: 'bg-blue-100 text-blue-700',
  CAUTION: 'bg-orange-100 text-orange-700',
  CRITICAL: 'bg-red-100 text-red-700',
};

export default function SOSDashboard() {
  const [phase, setPhase] = useState<AppPhase>('upload');
  const [data, setData] = useState<SOSSample[]>([]);
  const [results, setResults] = useState<EnrichedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiProgress, setGeminiProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table' | 'trends'>('table');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseFile = useCallback((file: File) => {
    return new Promise<SOSSample[]>((resolve, reject) => {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (r) => resolve(r.data as SOSSample[]),
          error: (err) => reject(new Error(`Error parsing CSV: ${err.message}`)),
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const bstr = e.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            resolve(XLSX.utils.sheet_to_json(ws) as SOSSample[]);
          } catch {
            reject(new Error('Error parsing Excel file.'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsBinaryString(file);
      } else {
        reject(new Error('Unsupported format. Please upload CSV or Excel.'));
      }
    });
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    setError(null);
    setGeminiError(null);
    try {
      const parsed = await parseFile(file);
      setData(parsed);
      setCurrentFileName(file.name);
    } catch (err: any) {
      setError(err.message);
    }
  }, [parseFile]);

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleProcess = () => {
    if (data.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setTimeout(() => {
      try {
        const processed = processSOSData(data);
        setResults(processed);
        setPhase('results');
        setActiveTab('table');
      } catch {
        setError('An error occurred during data processing.');
      } finally {
        setIsProcessing(false);
      }
    }, 600);
  };

  const handleGeminiEnrich = async () => {
    if (data.length === 0) return;
    setIsGeminiLoading(true);
    setGeminiError(null);
    setGeminiProgress(0);

    // Process in batches of 10 to avoid hitting token limits
    const BATCH = 10;
    const allEnrichments: Map<string, GeminiEnrichment> = new Map();
    const batches = [];
    for (let i = 0; i < data.length; i += BATCH) {
      batches.push(data.slice(i, i + BATCH));
    }

    try {
      for (let bi = 0; bi < batches.length; bi++) {
        const batch = batches[bi];
        const response = await fetch('/api/gemini-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ samples: batch }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || `API error ${response.status}`);
        }

        const { results: batchResults } = await response.json();
        batchResults?.forEach((r: any) => {
          if (r.labno) allEnrichments.set(String(r.labno), r);
        });

        setGeminiProgress(Math.round(((bi + 1) / batches.length) * 100));
        // Small delay between batches
        if (bi < batches.length - 1) await new Promise(res => setTimeout(res, 500));
      }

      setResults(prev =>
        prev.map(r => {
          const enrichment = allEnrichments.get(String(r.labno));
          return enrichment ? { ...r, ...enrichment } : r;
        })
      );
    } catch (err: any) {
      setGeminiError(err.message || 'Gemini analysis failed. Check your API key.');
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const handleChangeDocument = () => {
    // Reset everything back to upload phase
    setPhase('upload');
    setData([]);
    setResults([]);
    setError(null);
    setGeminiError(null);
    setCurrentFileName('');
    setExpandedRows(new Set());
    setSearchQuery('');
    setSelectedUnit('');
    setActiveTab('table');
    setGeminiProgress(0);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExport = () => {
    if (results.length === 0) return;
    const exportData = results.map(r => ({
      'Lab No': r.labno,
      'Unit No': r.unitno,
      'Interpret Date': r.interpretDate,
      'Sample Date': r.sampleDate,
      'Eval Code': r.evalCode,
      'Compartment': r.mainDesc,
      'Analysis (Rule-based)': r.analysis,
      'Recommendation (Rule-based)': r.recommendation,
      'Gemini Analysis': (r as any).geminiAnalysis || '',
      'Gemini Recommendation': (r as any).geminiRecommendation || '',
      'Gemini Severity': (r as any).geminiSeverity || '',
      'Gemini Failure Mode': (r as any).geminiFailureMode || '',
      'Gemini Confidence': (r as any).geminiConfidence || '',
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SOS Recommendations');
    XLSX.writeFile(wb, `SOS_Analysis_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const loadSampleData = () => {
    const sampleCsv = `labno,unitno,serialno,regno,custid,cust_name,modelid,makeid,model,make,compartid,compart,compartsn,oiltypeid,oilgradeid,coolantid,notesos,Sample Notes,label,last_interpret_date,sampledate,processdate,label_printed_time,oiladded,oilhours,actual_fluid_hours,meterread,oilchanged,filterchanged,evalcode,Job Site,Sampled Site,dateReported,Confirmed,Problem Solved,Action Taken,jobno,Customer Groups,Market Status,Report Logo,Region,cmu,interpreter,Work Order,EC,pH,Prec,Soln,NO2,NO3,Cl-,GLY,SO4,Odour,SolInt,SolCol,SolApp,SolCon,PptAmt,PptCol,PptMag,PptApp,OdrOdr,SolFoam,SolOil,SolFuel,Cu,Fe,Cr,Pb,Al,Si,Sn,Ni,Na,K,Mo,Ca,Mg,P,Zn,V40,V100,VI,F,WAT,UST,UOXI,USUL,UNIT,PQ,DEP,TAN,Ti,Sb,V,B,Ag,Mn,Cd,Ba,Li,In,Bi,TH,ISO,PC4,PC6,PC10,PC14,PC18,PC21,PC38,PC50,GLO
22997322,RD4268,ATY00790,,1878710,THIESS PTY LTD MINING,793C,CAT,793C,CATERPILLAR,313,TRANSMISSION, SHELL SPIRAX S4 CX,SHELL SPIRAX S4 CX,30,POWERCOOL : 824 PREMIX,Viscosity is consistent with oil type indicated. Sample contains a slight water contamination. Wear levels below the 5 micron range appear acceptable. Other test results appear acceptable. Suggested action: Water may be caused by condensation. No action advised on water trace at this stage. Continue sampling at the recommended interval.,,BC6352917 - HD13102791,01-Apr-26,26-Mar-26,31-Mar-26,3/27/2026 0:31,,525,525,62639,FALSE,TRUE,B,Caval Ridge,Caval Ridge,01-Apr-26,FALSE,FALSE,FALSE,,,CAT,,Mackay,62639,danifur,,,,,,,,,,,,,,,,,,,,,,,,2,2,<1,<1,<1,4,<1,<1,2,<1,<1,3136,12,815,969,94,,,,0.2,,5,,<1,4,L-F-,,<1,<1,<1,4,<1,<1,<1,<1,<1,<1,<1,,20/17/13,9598,866,148,63,33,22,4,3,
22998002,RD4268,ATY00790,,1878710,THIESS PTY LTD MINING,793C,CAT,793C,CATERPILLAR,505,HYDRAULIC SYSTEM, SHELL SPIRAX S4 CX,SHELL SPIRAX S4 CX,30,POWERCOOL : 824 PREMIX,All Test Results appear to be Normal. Continue Sampling at the Recommended Interval.,,BC6352916 - HD10416752,31-Mar-26,26-Mar-26,31-Mar-26,3/27/2026 0:31,,2588,2588,62639,FALSE,TRUE,A,Caval Ridge,Caval Ridge,01-Apr-26,FALSE,FALSE,FALSE,,,CAT,,Mackay,62639,AnalyticA,,,,,,,,,,,,,,,,,,,,,,,,2,1,<1,<1,<1,5,<1,<1,<1,2,<1,3205,12,825,993,95,,,,<0.1,,6,,<1,1,N---,,<1,<1,<1,2,<1,<1,<1,<1,<1,<1,<1,,22/19/15,22121,2559,594,169,31,11,1,<1,
22998040,RD4268,ATY00790,,1878710,THIESS PTY LTD MINING,793C,CAT,793C,CATERPILLAR,444,DIFFERENTIAL REAR, SHELL SPIRAX S5 CFD M (FD-1),SHELL SPIRAX S5 CFD M (FD-1),60,POWERCOOL : HB800 EG,Viscosity is low for oil grade indicated and compartment. Additive levels suggest a mixture of different oil types. This may be due to compartment transfer. Particle count is elevated. Suggested action: Investigate & Evaluate Compartment. Advise checking for compartment transfer. Monitor oil level in compartment. Inspect the magnetic plug for abnormal debris. Review sampling procedure in the event sampling technique has influenced results. Advise changing oil if not already changed. Resample following assessment to confirm normal conditions.,,BC6352914 - HD03189497,01-Apr-26,26-Mar-26,31-Mar-26,3/27/2026 0:31,,2588,2588,62639,FALSE,TRUE,C,Caval Ridge,Caval Ridge,01-Apr-26,FALSE,FALSE,FALSE,,,CAT,,Mackay,62639,danifur,,,,,,,,,,,,,,,,,,,,,,,,1,17,<1,<1,<1,5,<1,<1,2,<1,<1,2033,7,610,588,154,,,,<0.1,,7,,<1,15,MM--,,<1,<1,<1,40,<1,<1,<1,<1,<1,<1,<1,,24/23/19,103406,56598,13632,2657,481,163,4,1,
23004606,RD5016,2BW01350,,1878710,THIESS PTY LTD MINING,789C,CAT,789C,CATERPILLAR,101,ENGINE PRIMARY - DIESEL, SHELL RIMULA R4 MV,SHELL RIMULA R4 MV,15W40,,Viscosity is consistent with oil type indicated. Soot is elevated. Iron is high. Suggested action: Investigate & Evaluate Compartment. Check for causes of elevated sooting i.e. low boost pressure; high fuel burn; clogged air filters; duty cycle; fuel pressure etc. Ensure air cleaner elements are in serviceable condition. Inspect the used oil filters for abnormal debris. Consider reducing the oil change interval. Resample at 250 hours to further monitor.,,BC6355031 - HD03173578,02-Apr-26,28-Mar-26,01-Apr-26,3/28/2026 12:46,,531,531,3608,TRUE,TRUE,C,Sonoma,Sonoma,,FALSE,FALSE,FALSE,,,,,Mackay,3608,dorilau,,,,,,,,,,,,,,,,,,,,,,,,2,35,<1,1,<1,2,<1,<1,3,<1,55,1761,365,1003,1225,105,14,135,<2.0,<0.1,43,18,24,<1,<1,N--B,,<1,<1,<1,49,<1,<1,<1,<1,<1,<1,<1,,,,,,,,,,,
22990034,DZ1970,GEB00248,,2014477,CORONADO CURRAGH PTY LTD,D11T,CAT,D11T,CATERPILLAR,474,FINAL DRIVE RIGHT, FUCHS TITAN GEAR FD,FUCHS TITAN GEAR FD,60,,Viscosity is low for oil type indicated. Additive levels suggest a mixture of different oil types. High amount of magnetic metal was observed. PQ index (Ferrous debris) is slightly high. Iron is high. Chrome and lead are slightly high. Suggested action: Investigate & Evaluate Compartment. Inspect filter/screens/magnetic plugs for abnormal debris. Lead may be from Friction Bonding Material. Monitor oil level. Consider checking for oil transfer from other compartments. Further investigative measures required. Resample following assessment.,,BC6341354,30-Mar-26,18-Mar-26,30-Mar-26,3/18/2026 16:30,,556,556,53285,TRUE,FALSE,C,Thiess Curragh North,Thiess Curragh North,30-Mar-26,FALSE,FALSE,FALSE,,,CAT,,Rockhampton,53285,calvwan,,,,,,,,,,,,,,,,,,,,,,,,5,241,3,3,3,11,<1,6,35,1,<1,845,4,399,213,255,,,,<0.1,,8,,<1,47,HM--,,<1,<1,<1,58,<1,3,<1,<1,<1,<1,<1,,23/22/16,75102,32930,2985,349,89,39,4,1,
22993607,DZ2293,RAB01535,,1205921,HD BRISBANE FLEET HIRE,D10T2,CAT,D10T2,CATERPILLAR,505,HYDRAULIC SYSTEM, SHELL RIMULA R3 MV,SHELL RIMULA R3 MV,15W40,,Viscosity is high for oil grade. Aluminium and silicon indicating dirt contamination. Iron and PQ Index are high. Suggested action: Investigate & Evaluate Compartment. Check for possible dirt entry. This sample may be from a different compartment.,,BC6345699,01-Apr-26,22-Mar-26,30-Mar-26,3/22/2026 3:36,,102586,102000,113565,FALSE,TRUE,X,Thiess Olive Downs,Thiess Olive Downs,01-Apr-26,FALSE,FALSE,FALSE,,,CAT,,Mackay,113565,richham,,,,,,,,,,,,,,,,,,,,,,,,<1,175,2,<1,43,123,<1,<1,7,10,<1,348,6,319,29,286,,,,<0.1,,10,,<1,81,HM--,,2,<1,<1,86,<1,2,<1,<1,<1,<1,<1,,23/23/21,68315,54825,31926,14061,3964,1237,9,4,`;
    Papa.parse(sampleCsv, {
      header: true,
      skipEmptyLines: true,
      complete: (r) => {
        const parsed = r.data as SOSSample[];
        setData(parsed);
        setCurrentFileName('sample-data.csv');
        const processed = processSOSData(parsed);
        setResults(processed);
        setPhase('results');
      },
    });
  };

  const toggleRow = (labno: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(labno) ? next.delete(labno) : next.add(labno);
      return next;
    });
  };

  const hasGeminiData = results.some(r => (r as any).geminiAnalysis);

  const filteredResults = results.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.labno?.toLowerCase().includes(q) ||
      r.unitno?.toLowerCase().includes(q) ||
      r.mainDesc?.toLowerCase().includes(q) ||
      r.evalCode?.toLowerCase().includes(q)
    );
  });

  // Dashboard stats
  const getComponentStats = () => {
    const stats: Record<string, number> = {};
    results.forEach(r => { const d = r.mainDesc || 'Unknown'; stats[d] = (stats[d] || 0) + 1; });
    return Object.entries(stats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  };
  const getFailureModeStats = () => {
    const stats: Record<string, number> = {};
    results.forEach(r => {
      if (r.evalCode === 'C' || r.evalCode === 'X') {
        const mode = r.failureMode || 'Other';
        stats[mode] = (stats[mode] || 0) + 1;
      }
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  };
  const getSeverityStats = () => {
    const stats: Record<string, number> = { 'Normal (A/B)': 0, 'Caution (C)': 0, 'Critical (X)': 0 };
    results.forEach(r => {
      if (r.evalCode === 'X') stats['Critical (X)']++;
      else if (r.evalCode === 'C') stats['Caution (C)']++;
      else stats['Normal (A/B)']++;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  };
  const COLORS = ['#3b82f6', '#f97316', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899'];
  const SEVERITY_COLORS: Record<string, string> = { 'Normal (A/B)': '#94a3b8', 'Caution (C)': '#f59e0b', 'Critical (X)': '#dc2626' };
  const getUniqueUnits = () => Array.from(new Set(results.map(r => r.unitno))).sort();
  const getTrendData = () => {
    if (!selectedUnit) return [];
    return results.filter(r => r.unitno === selectedUnit)
      .sort((a, b) => new Date(a.sampleDate).getTime() - new Date(b.sampleDate).getTime())
      .map(r => ({ date: r.sampleDate, fe: r.fe, cu: r.cu, pb: r.pb, si: r.si, al: r.al, pq: r.pq, v40: r.v40, v100: r.v100 }));
  };

  // ── UPLOAD PHASE ──────────────────────────────────────────────────────
  if (phase === 'upload') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <Settings2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">SOS Analysis AI</h1>
            <p className="text-slate-500 text-sm">Heavy equipment oil analysis & maintenance recommendation engine</p>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-500" />
                Upload SOS Export File
              </CardTitle>
              <CardDescription>CSV or Excel (.xlsx / .xls)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={cn(
                  'relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 flex flex-col items-center justify-center text-center gap-4 cursor-pointer',
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
                  data.length > 0 && 'border-green-400 bg-green-50/30'
                )}
                onDragEnter={onDrag}
                onDragLeave={onDrag}
                onDragOver={onDrag}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  accept=".csv,.xlsx,.xls"
                />
                {data.length > 0 ? (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-2">
                    <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-7 w-7 text-green-600" />
                    </div>
                    <p className="font-semibold text-green-800">{data.length} samples loaded</p>
                    <p className="text-xs text-green-600 font-mono">{currentFileName}</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-700">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400">CSV, XLSX, or XLS — max 10MB</p>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2 text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 shadow-md shadow-blue-200"
                disabled={data.length === 0 || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>
                ) : (
                  <><Play className="h-4 w-4 mr-2 fill-current" />Run SOS Analysis</>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-slate-400">or</span>
                <Separator className="flex-1" />
              </div>

              <Button variant="outline" className="w-full text-blue-600 border-blue-200 bg-blue-50/50 hover:bg-blue-100" onClick={loadSampleData}>
                <Play className="h-4 w-4 mr-2 fill-current" />
                Load Sample Data
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-slate-400">
            Powered by rule-based SOS engine + Google Gemini AI
          </p>
        </div>
      </main>
    );
  }

  // ── RESULTS PHASE ─────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <Settings2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SOS Analysis AI</h1>
              <p className="text-xs text-slate-500 font-mono">{currentFileName} — {results.length} samples</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tab switcher */}
            <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
              {(['table', 'dashboard', 'trends'] as const).map(tab => (
                <Button key={tab} variant={activeTab === tab ? 'secondary' : 'ghost'} size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={cn('px-3 h-7 text-xs capitalize', activeTab === tab && 'bg-slate-100 shadow-sm')}>
                  {tab === 'table' && <TableIcon className="h-3 w-3 mr-1.5" />}
                  {tab === 'dashboard' && <BarChart3 className="h-3 w-3 mr-1.5" />}
                  {tab === 'trends' && <TrendingUp className="h-3 w-3 mr-1.5" />}
                  {tab}
                </Button>
              ))}
            </div>

            {/* Gemini button */}
            <Button
              onClick={handleGeminiEnrich}
              disabled={isGeminiLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white h-9 shadow-sm shadow-purple-200"
              size="sm"
            >
              {isGeminiLoading ? (
                <><Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />{geminiProgress}%</>
              ) : (
                <><Sparkles className="h-3.5 w-3.5 mr-2" />{hasGeminiData ? 'Re-analyze with Gemini' : 'Analyze with Gemini AI'}</>
              )}
            </Button>

            {/* Change document */}
            <Button variant="outline" size="sm" onClick={handleChangeDocument} className="h-9 text-slate-600">
              <FolderOpen className="h-3.5 w-3.5 mr-2" />
              Ganti Dokumen
            </Button>

            {/* Export */}
            <Button size="sm" onClick={handleExport} className="bg-green-600 hover:bg-green-700 h-9">
              <Download className="h-3.5 w-3.5 mr-2" />
              Export Excel
            </Button>
          </div>
        </header>

        {/* Gemini error */}
        {geminiError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2 text-red-700 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span><strong>Gemini error:</strong> {geminiError}</span>
          </motion.div>
        )}

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Samples', value: results.length, color: 'text-slate-900', bg: 'bg-white' },
            { label: 'Critical (X)', value: results.filter(r => r.evalCode === 'X').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Caution (C)', value: results.filter(r => r.evalCode === 'C').length, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Normal (A/B)', value: results.filter(r => r.evalCode !== 'C' && r.evalCode !== 'X').length, color: 'text-green-600', bg: 'bg-green-50' },
          ].map(stat => (
            <Card key={stat.label} className={cn('border-none shadow-sm', stat.bg)}>
              <CardContent className="p-4">
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── CONTENT AREA ── */}
        <AnimatePresence mode="wait">

          {/* TABLE TAB */}
          {activeTab === 'table' && (
            <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border-none shadow-sm">
                <CardHeader className="border-b flex flex-row items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <TableIcon className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-sm">Analysis Results</span>
                    {hasGeminiData && (
                      <Badge className="bg-purple-100 text-purple-700 border-0 text-[10px]">
                        <Sparkles className="h-2.5 w-2.5 mr-1" />Gemini Enhanced
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    <Input
                      placeholder="Search lab, unit, compartment..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="h-7 w-52 text-xs border-slate-200"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader className="sticky top-0 bg-slate-50/95 z-10 backdrop-blur-sm">
                        <TableRow>
                          <TableHead className="w-8"></TableHead>
                          <TableHead className="w-[100px] text-xs">Lab No</TableHead>
                          <TableHead className="w-[90px] text-xs">Unit No</TableHead>
                          <TableHead className="w-[100px] text-xs">Sample Date</TableHead>
                          <TableHead className="w-[65px] text-xs">Eval</TableHead>
                          <TableHead className="w-[140px] text-xs">Compartment</TableHead>
                          <TableHead className="min-w-[180px] text-xs">Analysis (Rule-based)</TableHead>
                          {hasGeminiData && <TableHead className="min-w-[180px] text-xs text-purple-600">
                            <div className="flex items-center gap-1"><Sparkles className="h-3 w-3" />Gemini AI</div>
                          </TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResults.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={hasGeminiData ? 8 : 7} className="text-center py-16 text-slate-400">
                              No results found
                            </TableCell>
                          </TableRow>
                        ) : filteredResults.map((row, idx) => {
                          const isExpanded = expandedRows.has(row.labno);
                          const gemini = row as any;
                          return (
                            <React.Fragment key={`${row.labno}-${idx}`}>
                              <TableRow
                                className={cn(
                                  'group cursor-pointer transition-colors',
                                  row.evalCode === 'X' && 'bg-red-50/40 hover:bg-red-50',
                                  row.evalCode === 'C' && 'hover:bg-orange-50/40',
                                  row.evalCode !== 'C' && row.evalCode !== 'X' && 'hover:bg-slate-50'
                                )}
                                onClick={() => toggleRow(row.labno)}
                              >
                                <TableCell className="pr-0">
                                  <div className="text-slate-400">
                                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                  </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs font-medium">{row.labno}</TableCell>
                                <TableCell className="font-medium text-sm">{row.unitno}</TableCell>
                                <TableCell className="text-xs text-slate-500">{row.sampleDate}</TableCell>
                                <TableCell>
                                  <Badge className={cn('w-7 h-7 rounded-full flex items-center justify-center p-0 text-xs font-bold',
                                    row.evalCode === 'X' ? 'bg-red-600 hover:bg-red-700 text-white' :
                                    row.evalCode === 'C' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                                    'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                  )}>
                                    {row.evalCode}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs font-semibold text-slate-700">{row.mainDesc}</TableCell>
                                <TableCell className="max-w-xs">
                                  {row.analysis ? (
                                    <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{row.analysis.split('\n')[0]}</p>
                                  ) : (
                                    <span className="text-slate-300 text-xs italic">No issues</span>
                                  )}
                                </TableCell>
                                {hasGeminiData && (
                                  <TableCell className="max-w-xs">
                                    {gemini.geminiAnalysis ? (
                                      <div className="space-y-1">
                                        <Badge className={cn('text-[9px] h-4 px-1.5 border-0', GEMINI_SEVERITY_COLORS[gemini.geminiSeverity] || 'bg-slate-100')}>
                                          {gemini.geminiSeverity}
                                        </Badge>
                                        <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{gemini.geminiFailureMode}</p>
                                      </div>
                                    ) : (
                                      <span className="text-slate-300 text-xs italic">—</span>
                                    )}
                                  </TableCell>
                                )}
                              </TableRow>

                              {/* Expanded row */}
                              {isExpanded && (
                                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                  <TableCell colSpan={hasGeminiData ? 8 : 7} className="py-4 px-6">
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                      className={cn('grid gap-6', hasGeminiData ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1')}>

                                      {/* Rule-based analysis */}
                                      <div className="space-y-3">
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                          <Brain className="h-3.5 w-3.5" />Rule-based Analysis
                                        </h4>
                                        {row.analysis ? (
                                          <pre className="text-[10px] font-mono text-slate-600 whitespace-pre-wrap bg-white rounded-lg p-3 border border-slate-100 leading-relaxed">
                                            {row.analysis}
                                          </pre>
                                        ) : (
                                          <p className="text-xs text-slate-400 italic">No abnormal parameters detected.</p>
                                        )}
                                        {row.recommendation && (
                                          <div className="space-y-1">
                                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recommendations</p>
                                            <div className="space-y-1">
                                              {row.recommendation.split('\n').filter(Boolean).map((line, i) => (
                                                <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-slate-200">{line.replace(/^-\s*/, '')}</p>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Gemini analysis */}
                                      {hasGeminiData && (
                                        <div className="space-y-3">
                                          <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5" />Gemini AI Analysis
                                          </h4>
                                          {gemini.geminiAnalysis ? (
                                            <>
                                              <div className="flex items-center gap-2">
                                                <Badge className={cn('text-[10px] border-0', GEMINI_SEVERITY_COLORS[gemini.geminiSeverity])}>
                                                  {gemini.geminiSeverity}
                                                </Badge>
                                                <span className="text-[10px] text-slate-500">Confidence: {gemini.geminiConfidence}%</span>
                                              </div>
                                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Failure Mode</p>
                                              <p className="text-xs text-slate-700 font-medium">{gemini.geminiFailureMode}</p>
                                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Analysis</p>
                                              <p className="text-xs text-slate-600 leading-relaxed bg-purple-50 rounded-lg p-3 border border-purple-100">
                                                {gemini.geminiAnalysis}
                                              </p>
                                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recommendations</p>
                                              <div className="space-y-1">
                                                {(gemini.geminiRecommendation || '').split('\n').filter(Boolean).map((line: string, i: number) => (
                                                  <p key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-purple-200">{line.replace(/^-\s*/, '')}</p>
                                                ))}
                                              </div>
                                            </>
                                          ) : (
                                            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                              <Loader2 className="h-3 w-3" />
                                              Not yet analyzed — click &ldquo;Analyze with Gemini AI&rdquo;
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </motion.div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                  <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-blue-500" />Component Distribution</CardTitle></CardHeader>
                  <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getComponentStats()} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={130} fontSize={10} tick={{ fill: '#64748b' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-blue-500" />Severity Distribution</CardTitle></CardHeader>
                  <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={getSeverityStats()} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {getSeverityStats().map((entry, index) => (
                            <Cell key={index} fill={SEVERITY_COLORS[entry.name]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm md:col-span-2">
                  <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><AlertCircle className="h-4 w-4 text-red-500" />Top Failure Modes (C & X samples)</CardTitle></CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getFailureModeStats()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} interval={0} angle={-30} textAnchor="end" height={80} />
                        <YAxis fontSize={10} tick={{ fill: '#64748b' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* TRENDS TAB */}
          {activeTab === 'trends' && (
            <motion.div key="trends" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border-none shadow-sm">
                <CardHeader className="border-b flex flex-row items-center justify-between py-3">
                  <div>
                    <CardTitle className="text-base font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-blue-500" />Historical Trends</CardTitle>
                    <CardDescription className="text-xs">Track parameter changes over time per unit</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="unit-select" className="text-xs text-slate-500">Unit No:</Label>
                    <select id="unit-select" value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)}
                      className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select Unit</option>
                      {getUniqueUnits().map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  {!selectedUnit ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <Search className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="text-sm text-slate-500">Select a Unit No to view historical trends</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {[
                        { title: 'Wear Metals (Fe, Cu, Pb)', icon: <Activity className="h-4 w-4 text-red-500" />, lines: [{ key: 'fe', name: 'Iron (Fe)', color: '#dc2626' }, { key: 'cu', name: 'Copper (Cu)', color: '#f59e0b' }, { key: 'pb', name: 'Lead (Pb)', color: '#7c3aed' }] },
                        { title: 'Contamination (Si, Al, PQ)', icon: <AlertCircle className="h-4 w-4 text-orange-500" />, lines: [{ key: 'si', name: 'Silicon (Si)', color: '#0891b2' }, { key: 'al', name: 'Aluminium (Al)', color: '#059669' }, { key: 'pq', name: 'PQ Index', color: '#4b5563' }] },
                        { title: 'Viscosity (V40, V100)', icon: <Settings2 className="h-4 w-4 text-blue-500" />, lines: [{ key: 'v40', name: 'Viscosity 40°C', color: '#2563eb' }, { key: 'v100', name: 'Viscosity 100°C', color: '#9333ea' }] },
                      ].map(chart => (
                        <div key={chart.title} className="space-y-3">
                          <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">{chart.icon}{chart.title}</h4>
                          <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={getTrendData()}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" fontSize={10} tick={{ fill: '#64748b' }} />
                                <YAxis fontSize={10} tick={{ fill: '#64748b' }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                {chart.lines.map(l => (
                                  <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={{ r: 4 }} />
                                ))}
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
