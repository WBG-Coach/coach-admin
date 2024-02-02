import CoachLogoSL from './CoachLogo.png';
import CoachLogoNP from './CoachLogoNP.svg';

export const CoachLogo = import.meta.env.VITE_COUNTRY === 'sl' ? CoachLogoSL : CoachLogoNP;
