import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, AlertCircle } from 'lucide-react';

interface PostForm {
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

const CreatePost = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    "Premier League",
    "La Liga",
    "Serie A",
    "World Cup",
    "Champions League",
    "Vintage",
    "90s",
    "Rare Finds",
    "Collections"
  ];

  const [form, setForm] = useState<PostForm>({
    title: '',
    content: '',
    imageUrl: '',
    tags: []
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    // Validation
    if (!form.title.trim()) {
      setFormError('Title is required');
      setIsSubmitting(false);
      return;
    }

    if (!form.content.trim()) {
      setFormError('Content is required');
      setIsSubmitting(false);
      return;
    }

    if (!form.imageUrl.trim()) {
      setFormError('Cover image URL is required');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get existing posts from localStorage
      const storedPosts = localStorage.getItem('communityPosts');
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      
      // Create new post
      const newPost = {
        id: Date.now(),
        title: form.title,
        content: form.content,
        image: form.imageUrl,
        imageAlt: form.title,
        author: user?.name || 'Anonymous',
        date: new Date().toISOString(),
        likes: 0,
        comments: 0,
        tags: selectedTags
      };
      
      // Add new post to the list
      posts.unshift(newPost);
      
      // Save updated list back to localStorage
      localStorage.setItem('communityPosts', JSON.stringify(posts));
      
      // Redirect to community page after successful creation
      navigate('/community');
    } catch (error) {
      setFormError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Create New Post</h1>

          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  placeholder="Enter your post title"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  placeholder="Write your post content here..."
                  required
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedTags.includes(tag)
                          ? 'bg-[#C5A572] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/community')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Publish Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;