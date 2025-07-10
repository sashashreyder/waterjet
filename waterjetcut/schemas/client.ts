export default {
    name: 'client',
    title: 'Клиенты',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Название компании',
        type: 'string',
      },
      {
        name: 'logo',
        title: 'Логотип',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  }
  