import { Injectable } from '@nestjs/common';
import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class AppService {
  async getVersion(): Promise<{ v: string; up: Date }> {
    const pkgPath = resolve('', 'package.json');
    const pkgStats = await stat(pkgPath);
    const pkgFile = await readFile(pkgPath);
    const pkgString = pkgFile.toString();
    const pkg = JSON.parse(pkgString);
    return { v: pkg['version'], up: pkgStats.mtime };
  }
}
