export default {
  name: 'contactSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Телефон',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Сообщение',
      type: 'text',
    },
    {
      name: 'source',
      title: 'Источник',
      type: 'string',
      options: {
        list: [
          { title: 'Главная страница', value: 'hero' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Контакты', value: 'contact' },
          { title: 'Презентация', value: 'presentation' },
        ],
      },
    },
    {
      name: 'submittedAt',
      title: 'Дата отправки',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Новый', value: 'new' },
          { title: 'Обработан', value: 'processed' },
          { title: 'Завершен', value: 'completed' },
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
      status: 'status',
    },
    prepare({ title, subtitle, status }: any) {
      return {
        title: title || 'Без имени',
        subtitle: `${subtitle} - ${status}`,
      };
    },
  },
};
