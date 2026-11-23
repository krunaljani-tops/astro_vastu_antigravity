import { DirectionType, PlanetKey } from './astrology';

export interface VastuZoneRule {
  zone: string; // e.g. 'North-East (NE / Ishanya)'
  zoneHi?: string; // 'उत्तर-पूर्व (ईशान कोण)'
  direction: DirectionType;
  directionHi?: string;
  degreeSpan: string;
  element: 'Water' | 'Air' | 'Fire' | 'Earth' | 'Space';
  elementHi?: string;
  rulingPlanet: PlanetKey;
  rulingPlanetHi?: string;
  deity: string;
  idealRooms: string[];
  idealRoomsHi?: string[];
  tabooItems: string[];
  tabooItemsHi?: string[];
  symptomsWhenDefective: string[];
  symptomsWhenDefectiveHi?: string[];
  standardRemedies: string[];
  standardRemediesHi?: string[];
}

export interface AstroVastuDefectTrigger {
  direction: DirectionType;
  directionHi?: string;
  zoneName: string;
  zoneNameHi?: string;
  triggeringSystem: 'Parashari' | 'Navatara' | 'BNN' | 'Jaimini';
  triggerPlanet: PlanetKey;
  severity: 'Critical' | 'High' | 'Moderate';
  cause: string;
  causeHi?: string;
  predictedSymptom: string;
  predictedSymptomHi?: string;
  homeLocation: string;
  homeLocationHi?: string;
  physicalDeclutterRemedy: string;
  physicalDeclutterRemedyHi?: string;
  elementalColorRemedy: string;
  elementalColorRemedyHi?: string;
  classicalRemedyCitation: string;
}

export interface AstroVastuSurroundingsPrediction {
  direction: DirectionType;
  directionHi?: string;
  confidence: 'High' | 'Medium';
  feature: string;
  featureHi?: string;
  detail: string;
  detailHi?: string;
  sourceRule: string;
}

export interface AstroVastuVerificationItem {
  id: string;
  direction: DirectionType;
  directionHi?: string;
  symptomStatement: string;
  symptomStatementHi?: string;
  context: string;
  contextHi?: string;
  confirmed?: boolean;
}

export interface AstroVastuFullDiagnosticReport {
  generatedAt: string;
  chartSummary: {
    ascendantSign: string;
    moonSign: string;
    moonNakshatra: string;
    currentDasha: string;
    a4Sign: string;
  };
  chartSummaryHi?: {
    ascendantSign: string;
    moonSign: string;
    moonNakshatra: string;
    currentDasha: string;
    a4Sign: string;
  };
  quickFriendlyTakeaways: {
    en: string[];
    hi: string[];
  };
  nearHouseSurroundings: AstroVastuSurroundingsPrediction[];
  internalHomeMisalignments: AstroVastuDefectTrigger[];
  verificationChecklist: AstroVastuVerificationItem[];
  threeTierRemedies: {
    tier1PhysicalDeclutter: {
      action: string;
      actionHi?: string;
      direction: DirectionType;
      directionHi?: string;
      itemsToRemove: string[];
      itemsToRemoveHi?: string[];
    }[];
    tier2ElementalColorVastu: {
      direction: DirectionType;
      directionHi?: string;
      element: string;
      elementHi?: string;
      prescribedColor: string;
      prescribedColorHi?: string;
      avoidColor: string;
      avoidColorHi?: string;
      correctiveObject: string;
      correctiveObjectHi?: string;
    }[];
    tier3ClassicalRemedies: {
      system: string;
      remedyText: string;
      remedyTextHi?: string;
      citation: string;
      deityOrMantra?: string;
    }[];
  };
  executiveSynthesis: string;
  executiveSynthesisHi?: string;
}
