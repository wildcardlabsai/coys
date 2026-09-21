'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { value: 'news', label: 'News' },
  { value: 'match_preview', label: 'Match Preview' },
  { value: 'match_report', label: 'Match Report' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'history', label: 'History' },
  { value: 'away_day', label: 'Away Day Guide' },
  { value: 'guide', label: 'General Guide' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [category, setCategory] = useState('news');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    if (!slugManual) {
      setSlug(slugify(value));
    }
  }, [slugManual]);

  function handleSave(publish: boolean) {
    setSaving(true);
    const article = {
      title,
      slug: slug || slugify(title),
      category,
      content,
      imageUrl,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      isPublished: publish,
    };
    console.log('Saving article:', article);
    setTimeout(() => setSaving(false), 1500);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">New Article</h1>
          <p className="text-sm text-muted mt-1">Create a new article, guide, or preview</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-outline btn-sm"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <Link href="/admin/articles" className="btn btn-ghost btn-sm">
            Cancel
          </Link>
        </div>
      </div>

      {showPreview ? (
        /* Preview */
        <div className="card p-6">
          <div className="max-w-2xl">
            {imageUrl && (
              <div className="w-full h-48 bg-border rounded-lg mb-4 flex items-center justify-center text-muted text-sm">
                Image: {imageUrl}
              </div>
            )}
            <span className="badge badge-muted mb-2">{category.replace('_', ' ')}</span>
            <h2 className="text-2xl font-bold font-heading text-foreground mb-2">{title || 'Untitled Article'}</h2>
            <p className="text-xs text-muted mb-4">/{slug || 'article-slug'}</p>
            <div className="prose prose-sm text-foreground whitespace-pre-wrap">
              {content || 'No content yet...'}
            </div>
            {tags && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {tags.split(',').map((tag, i) => (
                  <span key={i} className="badge badge-blue text-xs">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Edit Form */
        <div className="card p-4 md:p-6">
          <div className="space-y-4 max-w-3xl">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Article title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Slug
                <button
                  type="button"
                  onClick={() => { setSlugManual(!slugManual); if (slugManual) setSlug(slugify(title)); }}
                  className="ml-2 text-xs text-muted hover:text-foreground"
                >
                  {slugManual ? '(auto-generate)' : '(edit manually)'}
                </button>
              </label>
              <input
                value={slug}
                onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
                disabled={!slugManual}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground disabled:opacity-60"
                placeholder="article-slug"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground resize-y"
                placeholder="Write your article content here..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Featured Image URL</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="https://..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="away day, arsenal, north london derby"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !title}
                className="btn btn-outline"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !title || !content}
                className="btn btn-primary"
              >
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
