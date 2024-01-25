import { default as QROpenAppNP } from './open_app_np.png';
import { default as QROpenAppSL } from './open_app_sl.png';
export { default as QRScan } from './scan_qr.png';
export { default as QRSelectSchool } from './select_school.png';
export const QROpenApp = import.meta.env.VITE_COUNTRY === 'np' ? QROpenAppNP : QROpenAppSL;
