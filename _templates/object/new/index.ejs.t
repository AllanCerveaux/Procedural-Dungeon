---
inject: true
to: <%= indexPath %>
append: true
---
export { default as <%= h.inflection.classify(name) %> } from './<%= name %>/<%= name %>'
