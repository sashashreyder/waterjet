export default {
    name: 'work',
    title: 'Работа',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Изображение',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'caption',
        title: 'Подпись',
        type: 'string',
      },
    ],
  }
  