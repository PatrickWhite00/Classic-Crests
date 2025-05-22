import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, Heart, Share2, Star, Shield, ArrowLeft, Send, ChevronDown } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  fullContent?: string;
  image: string;
  imageAlt: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
  commentsList?: Comment[];
}

const getStoredPosts = (): BlogPost[] => {
  const stored = localStorage.getItem('communityPosts');
  return stored ? JSON.parse(stored) : [
    {
      id: 1,
      title: "The Story Behind Man United's '99 Treble-Winning Jersey",
      author: "Alex Thompson",
      date: "2025-04-15T10:30:00Z",
      content: "The 1999 Manchester United home kit is more than just a piece of clothing; it's a symbol of one of football's greatest achievements. This iconic shirt, worn during the historic treble-winning season...",
      fullContent: "The 1999 Manchester United home kit is more than just a piece of clothing; it's a symbol of one of football's greatest achievements. This iconic shirt, worn during the historic treble-winning season, has become a holy grail for collectors and fans alike.\n\nDesigned by Umbro, the '99 home jersey featured the classic red base with white collar and cuffs, complemented by the iconic Sharp sponsor logo in white. What makes this jersey particularly special is not just its design, but the memories associated with it.\n\nWhen Ole Gunnar Solskjaer stretched out his right leg to poke home the winner against Bayern Munich in the Champions League final, completing an unprecedented treble of Premier League, FA Cup, and Champions League titles, this jersey became immortalized in football history.\n\nThe shirt was worn by legends like David Beckham, Ryan Giggs, Paul Scholes, and Roy Keane during what many consider to be the greatest season in the club's illustrious history. Each of these players brought their unique skills and personalities to the team, creating a perfect blend of talent, determination, and team spirit.\n\nFor collectors, the '99 home jersey represents the pinnacle of Manchester United memorabilia. Original match-worn shirts from that season, especially those from the Champions League final, can fetch astronomical prices at auction. Even replica versions from that year have significantly increased in value.\n\nBeyond its monetary worth, the jersey holds immense emotional value for fans who lived through that magical season. It serves as a tangible connection to memories of last-minute winners, dramatic comebacks, and ultimate triumph against all odds.\n\nAt Classic Crests, we're proud to offer authentic replicas of this iconic jersey, allowing fans and collectors to own a piece of football history. Each jersey comes with detailed information about its historical significance and the unforgettable moments associated with it.\n\nWhether you're a die-hard Manchester United supporter or simply a football history enthusiast, the '99 treble-winning jersey is a must-have addition to any collection – a timeless reminder of one of football's greatest achievements.",
      image: "https://imgresizer.tntsports.io/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.tntsports.io/2019/05/23/2594259-53783890-2560-1440.jpg",
      imageAlt: "Ole Gunnar Solskjaer celebrating his Champions League winning goal for Manchester United in 1999",
      likes: 234,
      comments: 3,
      tags: ["Manchester United", "1999", "Champions League"],
      isLiked: false,
      commentsList: [
        {
          id: 1,
          author: "Tom Wilson",
          content: "I still remember exactly where I was when Solskjaer scored that winner. Goosebumps!",
          date: "2025-04-15T14:20:00Z",
          likes: 15
        },
        {
          id: 2,
          author: "Mark Davies",
          content: "The quality of those Umbro jerseys was something else. They don't make them like that anymore.",
          date: "2025-04-15T15:10:00Z",
          likes: 7
        },
        {
          id: 3,
          author: "Lisa Chen",
          content: "Would love to see a detailed comparison with modern United kits. The evolution would be fascinating!",
          date: "2025-04-15T16:05:00Z",
          likes: 9
        }
      ]
    },
    {
      id: 2,
      title: "Manchester City's 2012 Title-Winning Jersey: A Piece of History",
      author: "Marco Rossi",
      date: "2025-04-14T14:45:00Z",
      content: "The 2012 Manchester City home jersey represents one of the most dramatic moments in Premier League history. This iconic shirt, worn during the club's first Premier League title triumph, witnessed the unforgettable 'Agueroooo' moment...",
      fullContent: "The 2012 Manchester City home jersey represents one of the most dramatic moments in Premier League history. This iconic shirt, worn during the club's first Premier League title triumph, witnessed the unforgettable 'Agueroooo' moment that changed English football forever.\n\nThe 2011-12 season was a watershed moment for Manchester City. The sky blue Umbro jersey, featuring a clean design with white trim and the Etihad Airways sponsorship, became synonymous with the club's emergence as a genuine force in English football.\n\nOn the final day of the season, with City needing a win against QPR to secure their first league title in 44 years, the drama that unfolded was almost unbelievable. Trailing 2-1 in stoppage time, goals from Edin Dzeko and that historic strike from Sergio Aguero in the 93:20 minute snatched the title from Manchester United's grasp in the most dramatic fashion imaginable.\n\nThe jersey itself is a masterpiece of simplicity. The sky blue base color, a tradition dating back to 1894, was complemented by subtle white detailing. The technology incorporated into the shirt was cutting-edge for its time, featuring Umbro's moisture-wicking fabric that helped players perform in high-pressure situations - none more so than those final minutes against QPR.\n\nKey moments in this shirt include:\n\n- The 6-1 victory at Old Trafford\n- Vincent Kompany's crucial header against United\n- The final day drama against QPR\n- Yaya Toure's powerful performances throughout the season\n\nFor collectors, this jersey represents the beginning of a new era in English football. It's not just a piece of Manchester City history, but a symbol of the changing dynamics in the Premier League. Match-worn shirts from that season, especially those from the final game, are among the most sought-after items for football memorabilia collectors.\n\nThe 2012 title-winning jersey remains a powerful reminder of how football can produce moments of pure magic. It embodies not just a successful season, but the culmination of a long-term vision and the start of a new chapter in Manchester City's history.\n\nAt Classic Crests, we're honored to offer authentic versions of this historic jersey, each one carefully verified and presented with detailed documentation of its significance in football history. Whether you're a City fan who lived through that incredible moment or a collector of significant football memorabilia, this jersey tells a story that will be retold for generations to come.",
      image: "https://cdn.resfu.com/scripts/tmp_images/goal_sergioaguero-cropped_15rlwqqb2jfuu1dzd14ihn7wh5.jpg?size=1000x&lossy=1",
      imageAlt: "Sergio Aguero celebrating his title-winning goal for Manchester City in 2012",
      likes: 189,
      comments: 4,
      tags: ["Premier League", "Manchester City", "2012", "Title Winners"],
      isLiked: false,
      commentsList: [
        {
          id: 3,
          author: "Mike Wilson",
          content: "93:20 - A moment that will live forever in Premier League history!",
          date: "2025-04-14T15:30:00Z",
          likes: 15
        },
        {
          id: 9,
          author: "Sarah Thompson",
          content: "Still get chills thinking about Aguero's goal. What a day to be wearing that shirt.",
          date: "2025-04-14T16:20:00Z",
          likes: 11
        },
        {
          id: 10,
          author: "James Anderson",
          content: "The quality of that Umbro kit was exceptional. The shade of blue was perfect.",
          date: "2025-04-14T17:15:00Z",
          likes: 9
        },
        {
          id: 11,
          author: "David Chen",
          content: "This jersey represents such a pivotal moment in Premier League history. A true collector's item.",
          date: "2025-04-14T18:05:00Z",
          likes: 13
        }
      ]
    },
    {
      id: 3,
      title: "The Evolution of World Cup Jerseys: 1930-2022",
      author: "Sarah Martinez",
      date: "2025-04-13T09:15:00Z",
      content: "From the simple cotton shirts of the 1930s to today's high-tech designs, World Cup jerseys tell the story of football's evolution. Let's explore how these iconic shirts have changed over the decades...",
      fullContent: "From the simple cotton shirts of the 1930s to today's high-tech designs, World Cup jerseys tell the story of football's evolution. Let's explore how these iconic shirts have changed over the decades, reflecting not just sporting developments but cultural and technological shifts as well.\n\n**1930s-1950s: The Simple Beginnings**\n\nThe earliest World Cup jerseys were remarkably basic by today's standards. Made from heavy cotton, these shirts featured minimal design elements, typically solid colors with perhaps a national emblem sewn on. They were functional rather than fashionable, with comfort and durability being secondary concerns to simply identifying teams.\n\nUruguay's 1930 World Cup-winning shirt was a simple light blue cotton jersey, while Italy's 1934 and 1938 winners wore the traditional azzurri blue. These jerseys lacked manufacturer logos, sponsor emblems, or player names – elements we take for granted today.\n\n**1960s-1970s: The Design Revolution**\n\nThe 1960s and 70s saw a revolution in football shirt design. As television broadcasts of the World Cup became more common, teams began to pay more attention to their visual identity. Brazil's iconic yellow shirt with green trim, worn during their 1970 triumph, became perhaps the most recognizable football jersey in history.\n\nThis period also saw the introduction of manufacturer logos, with Adidas' three stripes appearing on several teams' kits. Materials began to evolve too, with lighter, more breathable fabrics replacing the heavy cotton of previous decades.\n\n**1980s-1990s: The Commercial Era**\n\nThe 1980s and 90s marked the beginning of football jerseys as fashion items and commercial products. Designs became bolder and more elaborate, with patterns and graphics that reflected the vibrant pop culture of the era. West Germany's 1990 home shirt, with its angular flag-inspired design, exemplifies this trend.\n\nThis period also saw rapid technological advancement in materials, with synthetic fabrics designed to enhance performance. Jerseys became lighter, more sweat-resistant, and more comfortable.\n\n**2000s-Present: High-Tech Performance Wear**\n\nModern World Cup jerseys are technological marvels, designed with performance in mind. Manufacturers like Nike, Adidas, and Puma invest millions in research and development, creating ultra-lightweight, moisture-wicking fabrics that help regulate body temperature.\n\nDesign has become more minimalist in recent tournaments, with clean lines and subtle details replacing the bold patterns of the 90s. However, alternate and away kits often feature experimental designs and colors.\n\nSustainability has also become a key concern, with many recent World Cup jerseys made from recycled materials. For example, many shirts at the 2022 Qatar World Cup were produced using recycled plastic bottles.\n\n**Collecting World Cup Jerseys**\n\nFor collectors, World Cup jerseys offer a fascinating journey through football history. The most valuable tend to be match-worn shirts from significant games or those donned by legendary players. However, even standard replicas from historic tournaments can become valuable over time.\n\nAt Classic Crests, we specialize in sourcing authentic World Cup jerseys from throughout history, allowing collectors to own a tangible piece of football's greatest tournament. Each jersey tells a story – of a nation's pride, a tournament's drama, and the beautiful game's evolution.",
      image: "https://static.dezeen.com/uploads/2022/11/football-world-cup-kits-fifa-2022-qatar-design_dezeen_2364_col_hero.jpg",
      imageAlt: "Collection of national team jerseys from the 2022 FIFA World Cup in Qatar",
      likes: 156,
      comments: 3,
      tags: ["World Cup", "History", "National Teams"],
      isLiked: false,
      commentsList: [
        {
          id: 4,
          author: "David Brown",
          content: "Amazing how far we've come from those heavy cotton shirts!",
          date: "2025-04-13T10:20:00Z",
          likes: 9
        },
        {
          id: 5,
          author: "Emma White",
          content: "The sustainability angle is really interesting. Great to see the sport moving in this direction.",
          date: "2025-04-13T11:15:00Z",
          likes: 11
        },
        {
          id: 12,
          author: "Carlos Rodriguez",
          content: "That 1970 Brazil jersey is the definition of timeless design. Still looks fresh today!",
          date: "2025-04-13T12:30:00Z",
          likes: 14
        }
      ]
    }
  ];
};

const Community = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(getStoredPosts());
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowAllComments(false);
    window.scrollTo(0, 0);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    setNewComment('');
    setShowAllComments(false);
  };

  const handleCreatePost = () => {
    if (isAuthenticated) {
      navigate('/create-post');
    } else {
      navigate('/login');
    }
  };

  const handleLikePost = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            }
          : post
      )
    );
  };

  const handleLikeComment = (postId: number, commentId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId && post.commentsList
          ? {
              ...post,
              commentsList: post.commentsList.map(comment =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              )
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim() || !isAuthenticated) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      author: "Current User",
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [...(post.commentsList || []), newCommentObj]
            }
          : post
      )
    );

    setNewComment('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDisplayedComments = (comments: Comment[] = []) => {
    return showAllComments ? comments : comments.slice(0, 3);
  };

  return (
    <div className="py-16">
      <div className="relative h-[300px] bg-cover bg-center -mt-16" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=2000")'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Community</h1>
            <p className="text-xl">Join the conversation about vintage football jerseys with fellow collectors and enthusiasts.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {selectedPost ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.imageAlt}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={handleClosePost}
                className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Return to community posts"
              >
                <ArrowLeft className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" aria-hidden="true" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  {formatDate(selectedPost.date)}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-6">{selectedPost.title}</h2>
              <div className="flex gap-2 mb-8">
                {selectedPost.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="prose max-w-none text-gray-700">
                {selectedPost.fullContent?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-6">Comments ({selectedPost.comments})</h3>
                
                {isAuthenticated ? (
                  <div className="mb-6">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                      />
                      <button
                        onClick={() => handleAddComment(selectedPost.id)}
                        disabled={!newComment.trim()}
                        className="px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        Comment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-600 mb-2">Please log in to join the discussion</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="text-[#C5A572] hover:text-[#B08E5C] font-medium"
                    >
                      Log in now
                    </button>
                  </div>
                )}
                
                <div className="space-y-6">
                  {getDisplayedComments(selectedPost.commentsList).map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {formatDate(comment.date)}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <button
                          onClick={() => handleLikeComment(selectedPost.id, comment.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-[#C5A572]"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{comment.likes} likes</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPost.commentsList && selectedPost.commentsList.length > 3 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="mt-6 flex items-center gap-2 text-[#C5A572] hover:text-[#B08E5C] font-medium"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${showAllComments ? 'rotate-180' : ''}`} />
                    {showAllComments ? 'Show Less' : `Show ${selectedPost.commentsList.length - 3} More Comments`}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLikePost(selectedPost.id)}
                    className={`flex items-center gap-2 ${
                      selectedPost.isLiked ? 'text-[#C5A572]' : 'text-gray-600 hover:text-[#C5A572]'
                    }`}
                    aria-label={`Like this post (${selectedPost.likes} likes)`}
                  >
                    <Heart className="w-5 h-5" fill={selectedPost.isLiked ? 'currentColor' : 'none'} />
                    {selectedPost.likes}
                  </button>
                  <button 
                    className="flex items-center gap-2 text-gray-600 hover:text-[#C5A572]"
                    aria-label="Share this post"
                  >
                    <Share2 className="w-5 h-5" aria-hidden="true" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {posts.map(post => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg"
                  onClick={() => handlePostClick(post)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePostClick(post);
                    }
                  }}
                  role="button"
                  aria-label={`Read article: ${post.title}`}
                >
                  <img 
                    src={post.image} 
                    alt={post.imageAlt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" aria-hidden="true" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4" aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 hover:text-[#C5A572]">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikePost(post.id);
                          }}
                          className={`flex items-center gap-2 ${
                            post.isLiked ? 'text-[#C5A572]' : 'text-gray-600 hover:text-[#C5A572]'
                          }`}
                        >
                          <Heart className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} />
                          {post.likes}
                        </button>
                        <span className="flex items-center gap-2 text-gray-600">
                          <MessageCircle className="w-5 h-5" aria-hidden="true" />
                          {post.comments}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle share
                          }}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#C5A572]"
                        >
                          <Share2 className="w-5 h-5" aria-hidden="true" />
                          Share
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-[#C5A572] hover:text-white transition"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-8">
              <button 
                onClick={handleCreatePost}
                className="w-full bg-[#C5A572] text-black py-3 rounded-lg font-semibold hover:bg-[#E3C28D] transition flex items-center justify-center gap-2"
                aria-label="Create a new post"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Create New Post
              </button>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["Premier League", "La Liga", "Serie A", "World Cup", "Champions League", "Vintage", "90s", "Rare Finds", "Collections"].map(tag => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-[#C5A572] hover:text-white cursor-pointer transition"
                      tabIndex={0}
                      role="button"
                      aria-label={`View posts tagged with ${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Join Our Community</h3>
                <p className="text-gray-600 mb-4">Connect with fellow jersey collectors, share your stories, and discover rare finds.</p>
                <button 
                  onClick={() => navigate('/signup')}
                  className="w-full bg-[#C5A572] text-black py-2 rounded-lg font-semibold hover:bg-[#E3C28D] transition"
                  aria-label="Sign up to join our community"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;