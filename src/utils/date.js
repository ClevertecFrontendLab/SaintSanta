export const formatDateReview = (dateString) => {
    const date = new Date(dateString)

    return (new Intl.DateTimeFormat('ru', {
      day: '2-digit',
      year: 'numeric',
      month: 'long',
    }).format(date)).slice(0, -2)
  }
