/**
 * @file AuthorPublicationVenues.jsx
 * @description Derives unique publication venues (journals) from article data.
 *              Does NOT call any additional API endpoints.
 */

/**
 * Build a ranked venue list from an array of article objects.
 * Returns at most `max` venues sorted by publication count desc.
 */
function buildVenues(articles, max = 6) {
  if (!Array.isArray(articles) || articles.length === 0) return [];

  const map = new Map(); // journal name -> { count, latestYear }
  articles.forEach((a) => {
    const name = a.journal_name ?? a.journal;
    if (!name) return;
    const year = a.publication_year ?? a.year ?? 0;
    if (!map.has(name)) {
      map.set(name, { name, count: 0, latestYear: year });
    }
    const entry = map.get(name);
    entry.count += 1;
    if (year > entry.latestYear) entry.latestYear = year;
  });

  return [...map.values()]
    .sort((a, b) => b.count - a.count || b.latestYear - a.latestYear)
    .slice(0, max);
}

export default function AuthorPublicationVenues({ articles = [] }) {
  const venues = buildVenues(articles);

  if (venues.length === 0) return null;

  return (
    <div className="adp-card adp-venues">
      <div className="adp-section-label">Publication Venues</div>

      {venues.map((v, i) => (
        <div key={i} className="adp-venue-row">
          <span className="adp-venue-rank">{i + 1}</span>
          <div className="adp-venue-info">
            <div className="adp-venue-name">{v.name}</div>
            {v.latestYear > 0 && (
              <div className="adp-venue-meta">Latest: {v.latestYear}</div>
            )}
          </div>
          <div className="adp-venue-count">
            <span className="adp-venue-count-num">{v.count}</span>
            <span className="adp-venue-count-label">{v.count === 1 ? "paper" : "papers"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
