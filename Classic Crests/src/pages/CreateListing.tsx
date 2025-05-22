import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, AlertCircle } from 'lucide-react';

interface ListingForm {
  name: string;
  year: string;
  price: number;
  team: string;
  league: string;
  condition: string;
  era: string;
  description: string;
  imageUrl: string;
}

const CreateListing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<ListingForm>({
    name: '',
    year: '',
    price: 0,
    team: '',
    league: '',
    condition: 'Excellent',
    era: '2000s',
    description: '',
    imageUrl: ''
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
    if (!form.name.trim()) {
      setFormError('Jersey name is required');
      setIsSubmitting(false);
      return;
    }

    if (!form.year.trim() || isNaN(Number(form.year)) || form.year.length !== 4) {
      setFormError('Please enter a valid year (YYYY)');
      setIsSubmitting(false);
      return;
    }

    if (form.price <= 0) {
      setFormError('Please enter a valid price');
      setIsSubmitting(false);
      return;
    }

    if (!form.team.trim()) {
      setFormError('Team name is required');
      setIsSubmitting(false);
      return;
    }

    if (!form.league.trim()) {
      setFormError('League is required');
      setIsSubmitting(false);
      return;
    }

    if (!form.imageUrl.trim()) {
      setFormError('Image URL is required');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get existing products from localStorage
      const storedProducts = localStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Generate a new unique ID
      const maxId = products.reduce((max: number, product: any) => 
        Math.max(max, product.id), 0);
      
      // Create new product
      const newProduct = {
        id: maxId + 1,
        name: form.name,
        price: form.price,
        image: form.imageUrl,
        year: form.year,
        team: form.team,
        league: form.league,
        condition: form.condition,
        era: form.era
      };
      
      // Add new product to the list
      products.push(newProduct);
      
      // Save updated list back to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      // Redirect to shop page after successful creation
      navigate('/shop');
    } catch (error) {
      setFormError('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Create New Listing</h1>

          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Jersey Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  placeholder="e.g., Manchester United 1999 Home"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                    placeholder="YYYY"
                    maxLength={4}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (£) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                    Team *
                  </label>
                  <input
                    type="text"
                    id="team"
                    name="team"
                    value={form.team}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="league" className="block text-sm font-medium text-gray-700 mb-1">
                    League *
                  </label>
                  <input
                    type="text"
                    id="league"
                    name="league"
                    value={form.league}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="era" className="block text-sm font-medium text-gray-700 mb-1">
                    Era
                  </label>
                  <select
                    id="era"
                    name="era"
                    value={form.era}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  >
                    <option value="80s">80s</option>
                    <option value="90s">90s</option>
                    <option value="2000s">2000s</option>
                    <option value="2010s">2010s</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  placeholder="Add any additional details about the jersey..."
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
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
                      Create Listing
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

export default CreateListing;