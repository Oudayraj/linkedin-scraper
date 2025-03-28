(async () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const offers = Array.from(document.querySelectorAll('ul.jobs-search__results-list li a.job-card-list__title'));
  const data = [];

  for (let i = 0; i < offers.length; i++) {
    offers[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    offers[i].click();
    await delay(2000); // Temps pour chargement des détails

    const jobTitle = document.querySelector('h2.top-card-layout__title')?.innerText.trim() || '';
    const company = document.querySelector('span.topcard__flavor')?.innerText.trim() || '';
    const location = document.querySelector('span.topcard__flavor--bullet')?.innerText.trim() || '';
    const postedDate = document.querySelector('span.posted-time-ago__text')?.innerText.trim() || '';
    const nbApplicants = document.querySelector('figcaption.num-applicants__caption')?.innerText.trim() || '';
    const description = document.querySelector('div.show-more-less-html__markup')?.innerText.trim().replace(/\s+/g, ' ') || '';
    const recruiter = document.querySelector('div.job-poster__name')?.innerText.trim() || '';
    const recruiterTitle = document.querySelector('div.job-poster__headline')?.innerText.trim() || '';
    const url = window.location.href;

    data.push({
      "Nom du poste": jobTitle,
      "Nom de l'entreprise": company,
      "Lieu": location,
      "Date de publication": postedDate,
      "Nombre de candidatures": nbApplicants,
      "Description": description,
      "Recruteur": recruiter + (recruiterTitle ? ` (${recruiterTitle})` : ''),
      "Lien de l'annonce": url
    });

    await delay(2000);
  }

  // Convertir en CSV
  const csvHeader = Object.keys(data[0]).join(',') + '\n';
  const csvRows = data.map(row => Object.values(row).map(val => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const urlBlob = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", urlBlob);
  link.setAttribute("download", `linkedin_scrape_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("✅ Scraping terminé ! Tu peux passer à la page suivante.");
})();

