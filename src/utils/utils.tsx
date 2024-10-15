import { promises as fs } from 'fs';
import path from 'path';

import { Work, works  } from '@/lib/data';

export async function getImagesFromDirectory (directory: string) {
  const dirPath = path.join(process.cwd(), directory)
  try {
    const files = await fs.readdir(dirPath)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()  // Obtiene la extensión del archivo
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)  // Extensiones de imagen
    });
    return imageFiles
  } catch (error) {
    console.error('Error reading directory:', error)
    return []
  }
}

export async function getRecentWorks () {
  try {
    return works
    .sort((a: Work, b: Work) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0,4)
  } catch (error) {
    console.error('No works! ', error)
    return []
  }
}
