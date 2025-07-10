import { useEffect, useState } from 'react'
import { fetchClients } from '../../../lib/sanity'

const ClientsSection = () => {
  const [clients, setClients] = useState<{ name: string; logo: string }[]>([])

  useEffect(() => {
    fetchClients().then((data) => {
      console.log('CLIENTS:', data)
      setClients(data)
    })
  }, [])
  

  const reviews = [
    { text: 'Высокое качество и точность, приятно работать.', name: 'ООО "ТехСтрой"' },
    { text: 'Оперативное выполнение заказа, рекомендую.', name: 'ЗАО "ПроМет"' },
    { text: 'Резка выполнена на высшем уровне!', name: 'АрхГрупп' },
  ]

  return (
    <section id="clients" className="bg-sky-50 py-24 px-4 md:px-8 text-[#1e293b]">
      <div className="max-w-6xl mx-auto text-center mb-20" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Наши клиенты</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Мы сотрудничаем с архитектурными бюро, производственными компаниями и частными заказчиками.
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10 max-w-5xl mx-auto mb-20"
        data-aos="fade-up"
      >
        {clients.map((client, i) => (
          <div key={i} className="flex items-center justify-center">
            <img src={client.logo} alt={client.name} className="max-h-12 object-contain" />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-700">
          {reviews.map((review, i) => (
            <div key={i} className="flex gap-3">
              <svg
                className="w-5 h-5 text-sky-500 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.17 6.84A4 4 0 0 0 4 11v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a4 4 0 0 0-2.83-3.83ZM17.17 6.84A4 4 0 0 0 14 11v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a4 4 0 0 0-2.83-3.83Z" />
              </svg>
              <div>
                <p className="mb-1">“{review.text}”</p>
                <span className="text-xs text-slate-500">— {review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsSection

  
  
  