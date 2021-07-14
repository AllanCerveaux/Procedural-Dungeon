---
inject: true
to: src/scripts/scenes/index.ts
append: true
---
export { default as <%= Name %> } from './<%= name %>/<%= name %>.scene'
