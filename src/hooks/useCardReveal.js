import { useEffect } from 'react'

/**
 * Anime les éléments .reveal-card dans le container ref.
 * Chaque carte pop vers le haut en cascade quand elle entre dans le viewport.
 * Passer des `deps` supplémentaires pour re-déclencher (ex: filtre actif).
 */
export default function useCardReveal(ref, deps = []) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll('.reveal-card'))
    if (!cards.length) return

    // Remet toutes les cartes en état caché
    cards.forEach(c => {
      c.classList.remove('card-visible')
      c.classList.add('card-hidden')
    })

    const animate = () =>
      cards.forEach((c, i) =>
        setTimeout(() => {
          c.classList.remove('card-hidden')
          c.classList.add('card-visible')
        }, i * 180)
      )

    // Si le container est déjà visible (ex: changement de filtre), anime directement
    const { top, bottom } = container.getBoundingClientRect()
    if (top < window.innerHeight && bottom > 0) {
      animate()
      return
    }

    // Sinon, observe l'entrée dans le viewport
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { animate(); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(container)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps])
}
