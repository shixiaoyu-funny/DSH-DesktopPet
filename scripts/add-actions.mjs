/**
 * Append the 2026-11 batch of idle/emote actions to the pet manifest.
 * Idempotent: entries whose id already exists are left untouched.
 *
 * Usage: node scripts/add-actions.mjs assets/manifest.json
 */

import { readFileSync, writeFileSync } from 'node:fs'

const target = process.argv[2]
if (!target) {
  console.error('usage: node scripts/add-actions.mjs <manifest.json>')
  process.exit(1)
}

const ACTIONS = [
  { id: 'stand_wipe', label: '站姿擦汗', posture: 'stand', scale: 0.995, file: 'assets/idle/站姿擦汗.webm' },
  { id: 'stand_hair', label: '站姿撩头发', posture: 'stand', scale: 0.995, file: 'assets/idle/站姿撩头发.webm' },
  { id: 'stand_angry', label: '站姿生气', posture: 'stand', scale: 0.995, file: 'assets/idle/站姿生气.webm' },
  { id: 'stand_giggle', label: '站姿捂嘴笑', posture: 'stand', scale: 0.995, file: 'assets/idle/站姿捂嘴笑.webm' },
  { id: 'sit_wipe', label: '正坐擦汗', posture: 'sit', sitKind: 'upright', scale: 0.875, offset: 12.8, file: 'assets/idle/正坐擦汗.webm' },
  { id: 'sit_hair', label: '正坐撩头发', posture: 'sit', sitKind: 'upright', scale: 0.875, offset: 12.8, file: 'assets/idle/正坐撩头发.webm' },
  { id: 'sit_angry', label: '正坐生气', posture: 'sit', sitKind: 'upright', scale: 0.875, offset: 12.8, file: 'assets/idle/正坐生气.webm' },
  { id: 'sit_giggle', label: '正坐捂嘴笑', posture: 'sit', sitKind: 'upright', scale: 0.875, offset: 12.8, file: 'assets/idle/正坐捂嘴笑.webm' },
  { id: 'sit_side_wipe', label: '侧坐擦汗', posture: 'sit', sitKind: 'side', scale: 1, offset: 0, ambient: false, file: 'assets/idle/侧坐擦汗.webm' },
  { id: 'sit_side_hair', label: '侧坐撩头发', posture: 'sit', sitKind: 'side', scale: 1, offset: 0, ambient: false, file: 'assets/idle/侧坐撩头发.webm' },
  { id: 'sit_side_angry', label: '侧坐生气', posture: 'sit', sitKind: 'side', scale: 1, offset: 0, ambient: false, file: 'assets/idle/侧坐生气.webm' },
  { id: 'sit_side_giggle', label: '侧坐捂嘴笑', posture: 'sit', sitKind: 'side', scale: 1, offset: 0, ambient: false, file: 'assets/idle/侧坐捂嘴笑.webm' },
]

const manifest = JSON.parse(readFileSync(target, 'utf8'))
const pool = manifest.pools?.idle
if (!pool || !Array.isArray(pool.items)) throw new Error('manifest has no pools.idle.items')

const known = new Set(pool.items.map((item) => item.id))
let added = 0
for (const action of ACTIONS) {
  if (known.has(action.id)) continue
  pool.items.push({
    ...action,
    fps: 60,
    frames: 178,
    duration: 2.967,
  })
  known.add(action.id)
  added += 1
}

writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`added ${added} action(s); idle items: ${pool.items.length}`)
