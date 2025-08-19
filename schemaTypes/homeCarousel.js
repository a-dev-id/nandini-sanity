// schemaTypes/homeCarousel.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homeCarousel',
  title: 'Home Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Carousel',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]}],
    }),
  ],
  preview: {select: {title: 'title', media: 'slides.0'}},
})
