// Genera qr/sodify-qr.png (2000x2000) y qr/sodify-qr.svg, y verifica que el PNG se lea.
// Uso: npm i --no-save qrcode sharp jsqr
//      node tools/generar-qr.mjs https://sodify-app.vercel.app
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';
import sharp from 'sharp';
import jsQR from 'jsqr';

const url = process.argv[2] ?? 'https://sodify-app.vercel.app';
const carpeta = join(dirname(fileURLToPath(import.meta.url)), '..', 'qr');
const opciones = {
  errorCorrectionLevel: 'H',
  margin: 4,
  color: { dark: '#12348FFF', light: '#FFFFFFFF' },
};

const png = join(carpeta, 'sodify-qr.png');
await QRCode.toFile(png, url, { ...opciones, type: 'png', width: 2000 });
await writeFile(join(carpeta, 'sodify-qr.svg'), await QRCode.toString(url, { ...opciones, type: 'svg' }));

const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const leido = jsQR(new Uint8ClampedArray(data), info.width, info.height);
if (leido?.data !== url) {
  console.error(`El QR no se leyó bien: ${leido?.data}`);
  process.exit(1);
}
console.log(`QR ${info.width}x${info.height} verificado: ${leido.data}`);
