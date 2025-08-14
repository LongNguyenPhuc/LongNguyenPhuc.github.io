import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit'
import { GApiGeneratorSchema } from './schema'
import * as path from 'path'
import orval from 'orval'

export async function gApiGenerator() {
  await orval(path.resolve(__dirname, './config/orval.ts'))
}

export default gApiGenerator
