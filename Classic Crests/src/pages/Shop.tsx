import React, { useState, useEffect } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  year: string;
  team: string;
  league: string;
  condition: string;
  era: string;
  description?: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Manchester United 1999 Home",
    price: 89.99,
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjZMQyABRpadhrJvM4mVRI17uPgHyYwZint8Bo",
    year: "1999",
    team: "Manchester United",
    league: "Premier League",
    condition: "Excellent",
    era: "90s",
    description: "Glory in Red – The Treble Triumph\n\nStep back into the heart of football history with the 1999 Manchester United home jersey – the shirt that witnessed the impossible. Worn during the club's legendary treble-winning season, this jersey is more than fabric; it's a symbol of resilience, last-minute miracles, and Ferguson's golden era. With its bold red design, black trim, and iconic Umbro branding, this shirt recalls Ole's unforgettable toe-poke in Barcelona and Keane's warrior spirit. Owning this piece means wearing one of the most dramatic stories ever written in football."
  },
  {
    id: 2,
    name: "AC Milan 2007 Away",
    price: 79.99,
    image: "https://classicfootballkit.co.uk/cdn/shop/files/resize-0-main01665048889_768x768.jpg?v=1700235220",
    year: "2007",
    team: "AC Milan",
    league: "Serie A",
    condition: "Good",
    era: "2000s",
    description: "Elegance and Immortality – Milan's Last European Conquest\n\nThe 2007 AC Milan away jersey reflects a team of unrivalled elegance on their path to redemption. This crisp white Adidas design, adorned with the classic Rossoneri trim, was donned by the likes of Kaká, Pirlo, and Maldini as they avenged Istanbul heartbreak with a masterclass in Athens. That night, Milan lifted their seventh European Cup, and this shirt became a symbol of poise, experience, and sheer footballing beauty. Own a piece worn by true legends, in what remains their last Champions League triumph to date."
  },
  {
    id: 3,
    name: "Brazil 2002 Home",
    price: 69.99,
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjkLXnESunWVvdepfXcLkSa9w2Fm6ON345TQGH",
    year: "2002",
    team: "Brazil",
    league: "National",
    condition: "Excellent",
    era: "2000s",
    description: "Samba and Supremacy – The Ronaldo Redemption\n\nCelebrate the magic of the Seleção with the 2002 Brazil home jersey – the kit that crowned the kings of world football for a fifth time. This vibrant yellow and green Nike classic encapsulates the flair, rhythm, and devastating efficiency of a squad led by the revitalised Ronaldo, backed by Ronaldinho and Rivaldo. From Ronaldo's golden boots to Cafu's emotional lift of the trophy, this jersey is a dance through history. It's not just a World Cup kit – it's the sound of samba echoing through Yokohama."
  },
  {
    id: 4,
    name: "Netherlands 1988 Home",
    price: 84.99,
    image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjLrr3Y6RGQnRiZSGuxH2J1Uyw9gKa3Pfe7EN6",
    year: "1988",
    team: "Netherlands",
    league: "National",
    condition: "Fair",
    era: "80s",
    description: "Total Football's Finest Hour\n\nThe 1988 Netherlands home shirt is as bold and brilliant as the team that wore it. With its geometric pattern and fierce orange hue, this Adidas masterpiece was the visual representation of Dutch total football. Marco van Basten's impossible volley in the final, Ruud Gullit's dominance, and Frank Rijkaard's steel brought the Netherlands their first – and only – major international title. This jersey isn't just rare – it's revolutionary. A symbol of style, power, and tactical innovation."
  },
  {
    id: 5,
    name: "Real Madrid 2000 Away",
    price: 94.99,
    image: "https://footsoccerpro.co/wp-content/uploads/2021/08/MAILLOT-RETRO-VINTAGE-REAL-MADRID-AWAY-1999-2000-1.jpg",
    year: "2000",
    team: "Real Madrid",
    league: "La Liga",
    condition: "Excellent",
    era: "2000s",
    description: "Galácticos Before the Name – Europe Reclaimed\n\nCrafted in regal purple and streaked with golden glory, the 2000 Real Madrid away jersey is a tribute to the dawn of a new continental dynasty. Worn during their victorious Champions League campaign, this shirt echoes the thunder of Raúl, the vision of Redondo, and the steely presence of Fernando Hierro. The night in Paris when Madrid dismantled Valencia cemented their return to European supremacy. This jersey speaks of tradition, transition, and trophies."
  },
  {
    id: 9,
    name: "Manchester City 2011 Home",
    price: 89.99,
    image: "https://www.vintagefootballshirts.com/cdn/shop/files/2011-12-manchester-city-umbro-63655-1.jpg?v=1730093007",
    year: "2011",
    team: "Manchester City",
    league: "Premier League",
    condition: "Excellent",
    era: "2010s",
    description: "The Awakening – Before the 93:20\n\nThis 2011 Manchester City home shirt stands on the brink of a revolution. Its minimalist sky-blue design and tailored Umbro finish marked a turning point in City's modern history. Though remembered just before that Aguero moment, this jersey symbolises the building momentum – Tevez's goals, Kompany's leadership, and Silva's artistry. The foundation of future dominance, it's a collector's nod to a squad that dared to dream – and came so close to changing it all."
  }
];

const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : initialProducts;
};

const Shop = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(getStoredProducts());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const eraParam = searchParams.get('era');
    if (eraParam) {
      setSelectedEra(eraParam);
    }
    
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  const teams = [...new Set(products.map(product => product.team))];
  const leagues = [...new Set(products.map(product => product.league))];
  const conditions = [...new Set(products.map(product => product.condition))];
  const eras = [...new Set(products.map(product => product.era))];

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.year.includes(searchQuery)
      );
    }
    
    if (selectedTeam) {
      result = result.filter(product => product.team === selectedTeam);
    }
    
    if (selectedLeague) {
      result = result.filter(product => product.league === selectedLeague);
    }
    
    if (selectedCondition) {
      result = result.filter(product => product.condition === selectedCondition);
    }
    
    if (selectedEra) {
      result = result.filter(product => product.era === selectedEra);
    }
    
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedTeam, selectedLeague, selectedCondition, selectedEra, priceRange]);

  useEffect(() => {
    let result = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case 'oldest':
        result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      default:
        break;
    }
    
    setSortedProducts(result);
  }, [filteredProducts, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFilterChange = (filterType: string, value: string | number | [number, number]) => {
    switch (filterType) {
      case 'team':
        setSelectedTeam(value as string);
        break;
      case 'league':
        setSelectedLeague(value as string);
        break;
      case 'condition':
        setSelectedCondition(value as string);
        break;
      case 'era':
        setSelectedEra(value as string);
        break;
      case 'price':
        setPriceRange(value as [number, number]);
        break;
      case 'sort':
        setSortBy(value as string);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTeam('');
    setSelectedLeague('');
    setSelectedCondition('');
    setSelectedEra('');
    setPriceRange([0, 200]);
    setSortBy('featured');
  };

  return (
    <div className="py-16">
      <div className="relative h-[300px] bg-cover bg-center -mt-16" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=2000")'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Shop</h1>
            <p className="text-xl">Browse our collection of authentic vintage football jerseys.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jerseys, teams, or years..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search for jerseys"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          <div className="flex gap-4">
            {isAuthenticated && (
              <Link
                to="/create-listing"
                className="px-4 py-3 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Listing
              </Link>
            )}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg"
              aria-expanded={mobileFiltersOpen}
              aria-controls="filter-section"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-1/4 ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`} id="filter-section">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <h3 className="text-lg font-bold mb-4">Filters</h3>
              
              <div role="radiogroup" aria-labelledby="era-filter">
                <h4 id="era-filter" className="font-semibold mb-2">Era</h4>
                <div className="space-y-2">
                  {eras.sort().map(era => (
                    <label key={era} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="era"
                        checked={selectedEra === era}
                        onChange={() => handleFilterChange('era', era)}
                        className="text-[#C5A572] focus:ring-[#C5A572]"
                        aria-label={era}
                      />
                      {era}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Team</h4>
                <div className="space-y-2">
                  {teams.map(team => (
                    <label key={team} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="team"
                        checked={selectedTeam === team}
                        onChange={() => handleFilterChange('team', team)}
                        className="text-[#C5A572] focus:ring-[#C5A572]"
                        aria-label={team}
                      />
                      {team}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">League</h4>
                <div className="space-y-2">
                  {leagues.map(league => (
                    <label key={league} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="league"
                        checked={selectedLeague === league}
                        onChange={() => handleFilterChange('league', league)}
                        className="text-[#C5A572] focus:ring-[#C5A572]"
                        aria-label={league}
                      />
                      {league}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => handleFilterChange('price', [0, parseInt(e.target.value)])}
                    className="w-full accent-[#C5A572]"
                    aria-label="Maximum price"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>£0</span>
                    <span>£{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div role="radiogroup" aria-labelledby="condition-filter">
                <h4 id="condition-filter" className="font-semibold mb-2">Condition</h4>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <label key={condition} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={selectedCondition === condition}
                        onChange={() => handleFilterChange('condition', condition)}
                        className="text-[#C5A572] focus:ring-[#C5A572]"
                        aria-label={condition}
                      />
                      {condition}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition mt-4"
                aria-label="Clear all filters"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600" aria-live="polite">
                {sortedProducts.length} products found
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  aria-label="Sort products by"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {(selectedTeam || selectedLeague || selectedCondition || selectedEra || priceRange[1] < 200) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-600">Active filters:</span>
                  
                  {selectedEra && (
                    <span className="bg-[#C5A572]/10 text-[#C5A572] px-3 py-1 rounded-full text-sm flex items-center">
                      Era: {selectedEra}
                      <button 
                        onClick={() => setSelectedEra('')}
                        className="ml-2 text-[#C5A572] hover:text-[#B08E5C]"
                        aria-label={`Remove ${selectedEra} era filter`}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {selectedTeam && (
                    <span className="bg-[#C5A572]/10 text-[#C5A572] px-3 py-1 rounded-full text-sm flex items-center">
                      Team: {selectedTeam}
                      <button 
                        onClick={() => setSelectedTeam('')}
                        className="ml-2 text-[#C5A572] hover:text-[#B08E5C]"
                        aria-label={`Remove ${selectedTeam} team filter`}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {selectedLeague && (
                    <span className="bg-[#C5A572]/10 text-[#C5A572] px-3 py-1 rounded-full text-sm flex items-center">
                      League: {selectedLeague}
                      <button 
                        onClick={() => setSelectedLeague('')}
                        className="ml-2 text-[#C5A572] hover:text-[#B08E5C]"
                        aria-label={`Remove ${selectedLeague} league filter`}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {selectedCondition && (
                    <span className="bg-[#C5A572]/10 text-[#C5A572] px-3 py-1 rounded-full text-sm flex items-center">
                      Condition: {selectedCondition}
                      <button 
                        onClick={() => setSelectedCondition('')}
                        className="ml-2 text-[#C5A572] hover:text-[#B08E5C]"
                        aria-label={`Remove ${selectedCondition} condition filter`}
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {priceRange[1] < 200 && (
                    <span className="bg-[#C5A572]/10 text-[#C5A572] px-3 py-1 rounded-full text-sm flex items-center">
                      Price: Up to £{priceRange[1]}
                      <button 
                        onClick={() => setPriceRange([0, 200])}
                        className="ml-2 text-[#C5A572] hover:text-[#B08E5C]"
                        aria-label="Remove price filter"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-[#C5A572] underline"
                    aria-label="Clear all filters"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  year={product.year}
                />
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products match your current filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 bg-[#C5A572] text-white px-6 py-2 rounded-lg hover:bg-[#B08E5C] transition"
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;