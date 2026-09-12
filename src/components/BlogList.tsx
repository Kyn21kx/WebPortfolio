import { useState } from 'react';

interface BlogPost {
  slug: string;
  data: {
    thumbnail?: string;
    title: string;
    tags: string[];
    author: string;
    date: string;
  };
}

interface BlogListProps {
  blogPosts: BlogPost[];
  isHome?: boolean;
}

const fmt = (dateStr: string, short = false) =>
  new Date(dateStr).toLocaleDateString('en-US', short
    ? { month: 'short', year: 'numeric' }
    : { day: '2-digit', month: 'short', year: 'numeric' }
  );

const BlogList = ({ blogPosts, isHome = false }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const filtered = sorted.filter((post) =>
    post.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const paginated = isHome
    ? sorted.slice(0, 3)
    : filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  if (isHome) {
    return (
      <section style={{
        padding: '4rem 0',
        borderTop: '1px solid #182a3e',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '1.4rem',
            fontWeight: 600,
            color: '#cce0f0',
            margin: '0 0 2rem',
          }}>
            Writing
          </p>
          <div style={{ borderTop: '1px solid #182a3e' }}>
            {paginated.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="home-article-row"
                style={{ textDecoration: 'none' }}
              >
                <span className="home-article-title">{post.data.title}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#3a5878',
                    whiteSpace: 'nowrap',
                  }}>
                    {fmt(post.data.date, true)}
                  </span>
                  <span className="home-article-arrow">→</span>
                </span>
              </a>
            ))}
          </div>
          <a href='/blog' style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.82rem',
            color: '#3d7fc1',
            textDecoration: 'none',
            borderBottom: '1px solid #3d7fc1',
            paddingBottom: '1px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#5a9ad8';
              (e.target as HTMLElement).style.borderBottomColor = '#5a9ad8';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#3d7fc1';
              (e.target as HTMLElement).style.borderBottomColor = '#3d7fc1';
            }}
          >
            All articles →
          </a>
        </div>

        <style>{`
          .home-article-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
            border-bottom: 1px solid #182a3e;
            gap: 1rem;
            transition: none;
          }
          .home-article-title {
            font-size: 0.95rem;
            color: #7a9ab5;
            line-height: 1.4;
            transition: color 0.15s;
            flex: 1;
          }
          .home-article-row:hover .home-article-title {
            color: #cce0f0;
          }
          .home-article-arrow {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.85rem;
            color: #3a5878;
            transition: color 0.15s;
          }
          .home-article-row:hover .home-article-arrow {
            color: #3d7fc1;
          }
          @media (max-width: 600px) {
            .home-article-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section style={{ padding: '4rem 0 6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#cce0f0',
            margin: '0 0 0.5rem',
          }}>
            Writing
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: '#7a9ab5',
            margin: '0 0 1.75rem',
            fontStyle: 'italic',
          }}>
            All opinions are my own and do not reflect those of my employer
          </p>
          <input
            type='text'
            placeholder='Search articles...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="blog-search-input"
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.875rem',
            color: '#7a9ab5',
            padding: '3rem 0',
          }}>
            No articles found for "{searchQuery}"
          </p>
        ) : (
          <div style={{ borderTop: '1px solid #182a3e' }}>
            {paginated.map((post) => (
              <article
                key={post.slug}
                className="full-article-entry"
              >
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#3a5878',
                  paddingTop: '0.1rem',
                  whiteSpace: 'nowrap',
                }}>
                  {fmt(post.data.date)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href={`/blog/${post.slug}`} className="full-article-title">
                    {post.data.title}
                  </a>
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {post.data.tags.map((tag, i) => (
                        <span key={i} style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '0.63rem',
                          color: '#3d7fc1',
                          background: '#122035',
                          border: '1px solid rgba(61, 127, 193, 0.25)',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <a href={`/blog/${post.slug}`} className="full-article-read">
                  Read →
                </a>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingTop: '2.5rem' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="page-btn"
            >
              ← Prev
            </button>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.78rem',
              color: '#3a5878',
            }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <style>{`
        .blog-search-input {
          width: 100%;
          max-width: 400px;
          background: #0d1a28;
          border: 1px solid #182a3e;
          border-radius: 4px;
          color: #cce0f0;
          padding: 0.55rem 0.9rem;
          font-size: 0.875rem;
          font-family: 'IBM Plex Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .blog-search-input::placeholder { color: #7a9ab5; }
        .blog-search-input:focus {
          border-color: #3d7fc1;
          box-shadow: 0 0 0 2px rgba(61, 127, 193, 0.12);
        }
        .full-article-entry {
          display: grid;
          grid-template-columns: 110px 1fr auto;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid #182a3e;
          align-items: start;
        }
        .full-article-title {
          font-size: 0.975rem;
          color: #cce0f0;
          text-decoration: none;
          line-height: 1.45;
          transition: color 0.15s;
        }
        .full-article-title:hover { color: #5a9ad8; }
        .full-article-read {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem;
          color: #3d7fc1;
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 1px solid #3d7fc1;
          padding-bottom: 1px;
          align-self: start;
          transition: color 0.15s, border-color 0.15s;
        }
        .full-article-read:hover {
          color: #5a9ad8;
          border-bottom-color: #5a9ad8;
        }
        .page-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
          color: #7a9ab5;
          background: transparent;
          border: 1px solid #182a3e;
          border-radius: 3px;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .page-btn:hover:not(:disabled) {
          color: #cce0f0;
          border-color: #3d7fc1;
        }
        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .full-article-entry {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogList;
