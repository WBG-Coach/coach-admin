import CoachLogoSL from './CoachLogo.png';
import CoachLogoNP from './CoachLogoNP.png';

export const CoachLogo = import.meta.env.VITE_COUNTRY === 'sl' ? CoachLogoSL : CoachLogoNP;
