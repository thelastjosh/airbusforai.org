import { useState, useEffect } from 'react';

export default function Signatories() {
  const [signatories, setSignatories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSignatories() {
      try {
        const response = await fetch('/api/signatories');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch signatories');
        }

        setSignatories(data.signatories);
      } catch (err) {
        console.error('Error fetching signatories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSignatories();
  }, []);

  const formatSignatory = (signatory) => {
    const parts = [];

    if (signatory.job_title) {
      parts.push(signatory.job_title);
    }

    if (signatory.affiliation) {
      parts.push(signatory.affiliation);
    }

    return parts.join(', ');
  };

  if (loading) {
    return (
      <div className="signatories">
        <h2>Signatories</h2>
        <p>Loading signatories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="signatories">
        <h2>Signatories</h2>
        <p>Error loading signatories: {error}</p>
      </div>
    );
  }

  if (signatories.length === 0) {
    return (
      <div className="signatories">
        <h2>Signatories</h2>
        <p>No verified signatories yet.</p>
      </div>
    );
  }

  return (
    <div className="signatories">
      <h2>Signatories</h2>
      <div className="signatories-list">
        {signatories.map((signatory, index) => {
          const details = formatSignatory(signatory);
          return (
            <p key={index}>
              <strong>{signatory.name}</strong>
              {details && ` ${details}`}
            </p>
          );
        })}
      </div>
    </div>
  );
}
