import { BNNAspectGroup, DirectionType, ElementType, PlanetKey, PlanetPosition } from '../types/astrology';

export interface BNNTrineSignMapping {
  element: ElementType;
  direction: DirectionType;
  signs: number[]; // e.g. [1, 5, 9] for Agni/East
  signNames: string[];
}

export const BNN_TRINE_GROUPS: BNNTrineSignMapping[] = [
  {
    element: 'Fire',
    direction: 'East',
    signs: [1, 5, 9], // Aries, Leo, Sagittarius
    signNames: ['Mesha (Aries)', 'Simha (Leo)', 'Dhanu (Sagittarius)'],
  },
  {
    element: 'Earth',
    direction: 'South',
    signs: [2, 6, 10], // Taurus, Virgo, Capricorn
    signNames: ['Vrishabha (Taurus)', 'Kanya (Virgo)', 'Makara (Capricorn)'],
  },
  {
    element: 'Air',
    direction: 'West',
    signs: [3, 7, 11], // Gemini, Libra, Aquarius
    signNames: ['Mithuna (Gemini)', 'Tula (Libra)', 'Kumbha (Aquarius)'],
  },
  {
    element: 'Water',
    direction: 'North',
    signs: [4, 8, 12], // Cancer, Scorpio, Pisces
    signNames: ['Karka (Cancer)', 'Vrishchika (Scorpio)', 'Meena (Pisces)'],
  },
];

/**
 * Computes BNN 1-5-9 Trinal Directional Conjunctions and synthesizes their Astro-Vastu impact
 */
export function analyzeBNNTrines(planets: PlanetPosition[]): BNNAspectGroup[] {
  return BNN_TRINE_GROUPS.map((group) => {
    // Collect planets in this trinal element
    const matchingPlanets = planets.filter((p) => group.signs.includes(p.signIndex));
    const planetKeys = matchingPlanets.map((p) => p.name);

    let conjunctionDescription = 'No planets occupying this trinal element.';
    let vastuSignificance = `Ruled by ${group.element} element. Direction: ${group.direction}. Maintain balanced elemental purity.`;

    if (planetKeys.length > 0) {
      conjunctionDescription = `Planets combined in 1-5-9 Trine (${group.direction}): ${planetKeys.join(' + ')}`;

      const descriptions: string[] = [];

      if (planetKeys.includes('Venus') && planetKeys.includes('Mars')) {
        descriptions.push(
          'Venus + Mars: Strong energy of property acquisition and passionate aesthetics. Check for luxury appliances, red/white decor clashes, or electrical-water crossover in this direction.'
        );
      }
      if (planetKeys.includes('Saturn') && planetKeys.includes('Rahu')) {
        descriptions.push(
          'Saturn + Rahu: High tendency for persistent clutters, unused electrical junk, old footwear, or heavy hidden debris in the corresponding zone.'
        );
      }
      if (planetKeys.includes('Jupiter') && planetKeys.includes('Sun')) {
        descriptions.push(
          'Jupiter + Sun: Majestic spiritual vibration (Guru-Surya Yoga). Ideal direction for family altar, prestigious awards, brass sacred emblems, or prayer space.'
        );
      }
      if (planetKeys.includes('Moon') && planetKeys.includes('Saturn')) {
        descriptions.push(
          'Moon + Saturn: Water-Earth stagnation (Visha Yoga influence). Check for plumbing leakages, dark storage, damp corners, or slow-moving drainage in this sector.'
        );
      }
      if (planetKeys.includes('Mars') && planetKeys.includes('Ketu')) {
        descriptions.push(
          'Mars + Ketu: High electromagnetic tension, risk of wiring short-circuits, sharp tools, or structural cracks in this sector.'
        );
      }
      if (planetKeys.includes('Mercury') && planetKeys.includes('Jupiter')) {
        descriptions.push(
          'Mercury + Jupiter: Saraswati Yoga. Exceptional sector for intellectual pursuits, home library, accounts, educational tools, and green plants.'
        );
      }

      if (descriptions.length > 0) {
        vastuSignificance = descriptions.join(' | ');
      } else {
        vastuSignificance = `${planetKeys.join(
          ', '
        )} project their combined vibrational force into the ${group.direction} (${group.element}). Ensure this sector matches the primary karakatwas of the occupants.`;
      }
    }

    return {
      direction: group.direction,
      element: group.element,
      signs: group.signs,
      planets: planetKeys,
      conjunctionDescription,
      vastuSignificance,
    };
  });
}
