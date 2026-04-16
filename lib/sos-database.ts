import { SOS_DATA_1 } from './sos-data-1';
import { SOS_DATA_2 } from './sos-data-2';
import { SOS_DATA_3 } from './sos-data-3';
import { SOS_DATA_4 } from './sos-data-4';
import { SOS_DATA_5 } from './sos-data-5';

export interface SOSRule {
  id: number;
  maintId: string;
  issueParameter: string;
  recommendationIdn: string | null;
  recommendationAus: string | null;
  active: number;
}

export const SOS_DATABASE: SOSRule[] = [
  ...SOS_DATA_1,
  ...SOS_DATA_2,
  ...SOS_DATA_3,
  ...SOS_DATA_4,
  ...SOS_DATA_5
];

