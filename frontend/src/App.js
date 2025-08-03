import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [emotionQuadrants, setEmotionQuadrants] = useState({});
  const [activities, setActivities] = useState([]);
  const [userEmotions, setUserEmotions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Enhanced emotion data with descriptions
  const EMOTION_DATA = {
    "high_energy_low_pleasant": {
      "Anger": "Feeling strong displeasure or hostility",
      "Frustration": "Being upset due to inability to change or achieve something", 
      "Anxiety": "Feeling worried, nervous, or uneasy about something",
      "Irritation": "Being annoyed or made impatient by someone or something",
      "Stress": "Feeling pressured or overwhelmed by demands",
      "Overwhelm": "Being completely overcome by responsibilities or emotions",
      "Rage": "Intense, uncontrolled anger",
      "Panic": "Sudden uncontrollable fear or anxiety"
    },
    "high_energy_high_pleasant": {
      "Excitement": "Feeling eager enthusiasm and anticipation",
      "Joy": "A feeling of great pleasure and happiness",
      "Curiosity": "Eager to know or learn something new", 
      "Enthusiasm": "Intense and eager enjoyment or interest",
      "Elation": "Great happiness and exhilaration",
      "Ecstasy": "An overwhelming feeling of great happiness",
      "Euphoria": "A feeling of intense excitement and happiness",
      "Bliss": "Perfect happiness and contentment"
    },
    "low_energy_high_pleasant": {
      "Calm": "Peaceful, relaxed, and untroubled",
      "Contentment": "A state of happiness and satisfaction",
      "Security": "Feeling safe, stable, and protected",
      "Peace": "Freedom from disturbance; tranquility",
      "Satisfaction": "Fulfillment of desires, expectations, or needs",
      "Serenity": "The state of being calm and peaceful",
      "Gratitude": "Being thankful and appreciative",
      "Relief": "Reassurance and relaxation after anxiety"
    },
    "low_energy_low_pleasant": {
      "Sadness": "Feeling sorrow or unhappiness",
      "Fatigue": "Extreme tiredness and lack of energy",
      "Loneliness": "Feeling sad due to lack of companionship",
      "Disappointment": "Sadness from unfulfilled hopes or expectations",
      "Melancholy": "A pensive sadness or thoughtful sorrow",
      "Despair": "Complete loss of hope",
      "Grief": "Deep sorrow over loss",
      "Emptiness": "Feeling hollow or devoid of meaning"
    }
  };

  // Context options
  const CONTEXT_OPTIONS = {
    location: ["Home", "Work", "Outside", "Hanging out", "Traveling", "Gym", "Restaurant", "Shopping", "Transport"],
    social_setting: ["By myself", "Family", "Friends", "Co-workers", "Pets", "Significant other", "Strangers", "Large group"],
    current_activity: ["Working", "Relaxing", "Exercising", "Eating", "Socializing", "Learning", "Creating", "Commuting", "Sleeping"]
  };

  // Landing page component
  const LandingPage = () => (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <img src="https://customer-assets.emergentagent.com/job_eq-empowerment/artifacts/0s5x9cly_logo%201%20-%20transparent%20background.png" alt="Pome" className="logo" />
            <h1>Build Your Emotional Intelligence</h1>
            <p className="hero-subtitle">
              Empower yourself with tools to track emotional states, identify triggers, 
              and discover activities that shift you into a more resourceful, resilient mindset.
            </p>
            <button 
              className="cta-button"
              onClick={() => setCurrentView('signup')}
            >
              Start Your Journey
            </button>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1518708909080-704599b19972?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1lZGl0YXRpb258ZW58MHx8fHwxNzUzNzI0NDM3fDA&ixlib=rb-4.1.0&q=85" 
              alt="Woman practicing mindfulness"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How Pome Helps You Grow</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Track Your Emotions</h3>
            <p>Log your emotional states using our science-based quadrant system to understand your patterns and triggers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Identify Triggers</h3>
            <p>Discover what situations, people, or activities consistently affect your emotional state and well-being</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Build Resourceful Activities</h3>
            <p>Create a personalized toolkit of activities across five energy categories that help you thrive</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>See Your Progress</h3>
            <p>Get insights into your emotional patterns and see which activities work best for building resilience</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <blockquote>
            "Understanding my emotional patterns has been life-changing. I now know exactly which activities help me feel more resourceful and confident."
          </blockquote>
          <cite>— Sarah, Beta User</cite>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="feedback-section">
        <h2>Help Us Improve</h2>
        <p>Your feedback is valuable! Let us know what features would help you most on your emotional intelligence journey.</p>
        <div className="feedback-form">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfimMroes1U1ho1k3nNmVuJHPxDXp_CcYWl4GTgyFkmqxHotQ/viewform?embedded=true" 
            width="100%" 
            height="2001" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            title="Feedback Form"
          >
            Loading…
          </iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Pome. Empowering women through emotional intelligence.</p>
      </footer>
    </div>
  );

  // Signup component
  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${BACKEND_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const userData = await response.json();
        setUser(userData);
        setCurrentView('app');
        loadUserData(userData.id);
      } catch (error) {
        console.error('Signup error:', error);
      }
    };

    return (
      <div className="auth-container">
        <div className="auth-card">
          <img src="https://customer-assets.emergentagent.com/job_eq-empowerment/artifacts/0s5x9cly_logo%201%20-%20transparent%20background.png" alt="Pome" className="auth-logo" />
          <h2>Welcome to Your Journey</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <button type="submit" className="auth-button">Start Tracking</button>
          </form>
          <button 
            className="link-button"
            onClick={() => setCurrentView('landing')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  // Main app component
  const MainApp = () => {
    const [currentSection, setCurrentSection] = useState('emotions');
    const [selectedQuadrant, setSelectedQuadrant] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [emotionContext, setEmotionContext] = useState({
      location: '',
      social_setting: '',
      current_activity: ''
    });
    const [userActivities, setUserActivities] = useState([]);

    // Reset emotion selection when quadrant changes
    useEffect(() => {
      setSelectedEmotion('');
      setEmotionContext({ location: '', social_setting: '', current_activity: '' });
    }, [selectedQuadrant]);

    // Load user activities function inside MainApp component
    const loadUserActivities = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${BACKEND_URL}/api/user-activities/${user.id}`);
        const userActData = await response.json();
        setUserActivities(userActData);
      } catch (error) {
        console.error('Error loading user activities:', error);
      }
    };

    // Load user activities on component mount
    useEffect(() => {
      loadUserActivities();
    }, [user]);

    const handleQuadrantSelect = (quadrant) => {
      setSelectedQuadrant(quadrant);
    };

    const handleEmotionSelect = (emotion) => {
      setSelectedEmotion(emotion);
    };

    const handleContextSelect = (type, value) => {
      setEmotionContext(prev => ({
        ...prev,
        [type]: prev[type] === value ? '' : value
      }));
    };

    const handleAddActivity = async (activity) => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/user-activities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            activity_id: activity.id,
            completed: false
          })
        });
        
        if (response.ok) {
          setUserActivities(prev => [...prev, { activity_id: activity.id, activity_name: activity.name }]);
          loadUserActivities();
        }
      } catch (error) {
        console.error('Error adding activity:', error);
      }
    };

    const logEmotion = async () => {
      if (!selectedQuadrant || !selectedEmotion) return;

      try {
        await fetch(`${BACKEND_URL}/api/emotions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            quadrant: selectedQuadrant,
            specific_emotion: selectedEmotion,
            context: emotionContext
          })
        });
        
        // Reset form
        setSelectedQuadrant('');
        setSelectedEmotion('');
        setEmotionContext({ location: '', social_setting: '', current_activity: '' });
        
        // Reload user emotions and analytics
        loadUserEmotions();
        loadAnalytics();
        alert('Emotion logged successfully!');
      } catch (error) {
        console.error('Error logging emotion:', error);
      }
    };

    const quadrantDisplayNames = {
      'high_energy_low_pleasant': 'High Energy / Low Pleasantness',
      'high_energy_high_pleasant': 'High Energy / High Pleasantness', 
      'low_energy_high_pleasant': 'Low Energy / High Pleasantness',
      'low_energy_low_pleasant': 'Low Energy / Low Pleasantness'
    };

    return (
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <img src="https://customer-assets.emergentagent.com/job_eq-empowerment/artifacts/0s5x9cly_logo%201%20-%20transparent%20background.png" alt="Pome" className="app-logo" />
          <div className="user-info">Hello, {user.name}!</div>
        </header>

        {/* Navigation */}
        <nav className="app-nav">
          <button 
            className={currentSection === 'emotions' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentSection('emotions')}
          >
            Track Emotions
          </button>
          <button 
            className={currentSection === 'activities' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentSection('activities')}
          >
            Activities
          </button>
          <button 
            className={currentSection === 'analytics' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentSection('analytics')}
          >
            Analytics
          </button>
        </nav>

        {/* Main Content */}
        <main className="app-main">
          {currentSection === 'emotions' && (
            <div className="emotions-section">
              <h2>How are you feeling right now?</h2>
              
              {/* Quadrant Selection */}
              <div className="quadrant-selection">
                <h3>Select Your Energy Quadrant:</h3>
                <div className="quadrant-grid">
                  {Object.keys(EMOTION_DATA).map(quadrant => (
                    <button
                      key={quadrant}
                      className={selectedQuadrant === quadrant ? 'quadrant-button active' : 'quadrant-button'}
                      onClick={() => handleQuadrantSelect(quadrant)}
                    >
                      <div className="quadrant-title">{quadrantDisplayNames[quadrant]}</div>
                      <div className="quadrant-emotions">
                        {Object.keys(EMOTION_DATA[quadrant]).slice(0, 3).join(', ')}...
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Emotion */}
              {selectedQuadrant && EMOTION_DATA[selectedQuadrant] && (
                <div className="emotion-selection">
                  <h3>Which specific emotion describes you best?</h3>
                  <div className="emotion-buttons">
                    {Object.entries(EMOTION_DATA[selectedQuadrant]).map(([emotion, description]) => (
                      <button
                        key={emotion}
                        className={selectedEmotion === emotion ? 'emotion-button active' : 'emotion-button'}
                        onClick={() => handleEmotionSelect(emotion)}
                      >
                        <div className="emotion-name">{emotion}</div>
                        <div className="emotion-description">{description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Context */}
              {selectedEmotion && (
                <div className="context-section">
                  <h3>Context (Optional):</h3>
                  
                  <div className="context-group">
                    <h4>Where are you?</h4>
                    <div className="context-options">
                      {CONTEXT_OPTIONS.location.map(option => (
                        <button
                          key={option}
                          className={emotionContext.location === option ? 'context-option active' : 'context-option'}
                          onClick={() => handleContextSelect('location', option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="context-group">
                    <h4>Who are you with?</h4>
                    <div className="context-options">
                      {CONTEXT_OPTIONS.social_setting.map(option => (
                        <button
                          key={option}
                          className={emotionContext.social_setting === option ? 'context-option active' : 'context-option'}
                          onClick={() => handleContextSelect('social_setting', option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="context-group">
                    <h4>What were you doing?</h4>
                    <div className="context-options">
                      {CONTEXT_OPTIONS.current_activity.map(option => (
                        <button
                          key={option}
                          className={emotionContext.current_activity === option ? 'context-option active' : 'context-option'}
                          onClick={() => handleContextSelect('current_activity', option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              {selectedEmotion && (
                <button onClick={logEmotion} className="log-emotion-button">
                  Log This Emotion
                </button>
              )}

              {/* Recent Emotions */}
              <div className="recent-emotions">
                <h3>Your Recent Emotions:</h3>
                <div className="emotion-history">
                  {userEmotions.slice(0, 5).map((emotion, index) => (
                    <div key={index} className="emotion-entry">
                      <span className="emotion-name">{emotion.specific_emotion}</span>
                      <span className="emotion-time">
                        {new Date(emotion.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 'activities' && (
            <div className="activities-section">
              <h2>Resourceful Activities</h2>
              <p className="subtitle">Choose multiple activities for each week to help you become more resourceful and resilient. Build your personal toolkit across five energy categories:</p>
              
              <div className="energy-categories">
                <div className="category-legend">
                  <span className="category physical">Physical</span>
                  <span className="category emotional">Emotional</span>
                  <span className="category social">Social</span>
                  <span className="category natural">Natural</span>
                  <span className="category spiritual">Spiritual</span>
                </div>
              </div>

              <div className="activities-grid">
                {activities.map(activity => (
                  <div key={activity.id} className="activity-card">
                    <h4>{activity.name}</h4>
                    <div className="activity-categories">
                      {activity.energy_categories.map(category => (
                        <span key={category} className={`category-tag ${category}`}>
                          {category}
                        </span>
                      ))}
                    </div>
                    <button 
                      className={userActivities.some(ua => ua.activity_id === activity.id) ? 'add-activity-button added' : 'add-activity-button'}
                      onClick={() => handleAddActivity(activity)}
                    >
                      {userActivities.some(ua => ua.activity_id === activity.id) ? 'Added to Plan ✓' : 'Add to My Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'analytics' && (
            <div className="analytics-section">
              <h2>Your Emotional Patterns</h2>
              
              {!analytics || analytics.total_entries < 5 ? (
                <div className="empty-analytics">
                  <h3>📊 Analytics Coming Soon</h3>
                  <p>Check in with your emotions more often to see patterns emerge.</p>
                  <p>We'll show your insights after you've logged at least 5 emotions!</p>
                </div>
              ) : (
                <div className="analytics-content">
                  <div className="analytics-card">
                    <h3>Quadrant Distribution</h3>
                    <div className="quadrant-stats">
                      {Object.entries(analytics.quadrant_distribution).map(([quadrant, count]) => (
                        <div key={quadrant} className="stat-item">
                          <span className="stat-label">{quadrantDisplayNames[quadrant]}:</span>
                          <span className="stat-value">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="analytics-card">
                    <h3>Most Common Emotions</h3>
                    <div className="emotion-stats">
                      {Object.entries(analytics.emotion_frequency)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([emotion, count]) => (
                          <div key={emotion} className="stat-item">
                            <span className="stat-label">{emotion}:</span>
                            <span className="stat-value">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="analytics-card">
                    <h3>Trigger Analysis</h3>
                    {Object.entries(analytics.trigger_analysis).map(([trigger_type, triggers]) => (
                      <div key={trigger_type} className="trigger-group">
                        <h4>{trigger_type.replace('_', ' ').toUpperCase()}:</h4>
                        {Object.entries(triggers)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 3)
                          .map(([trigger, count]) => (
                            <div key={trigger} className="stat-item">
                              <span className="stat-label">{trigger}:</span>
                              <span className="stat-value">{count}</span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    );
  };

  // Load data functions
  const loadUserData = async (userId) => {
    try {
      // Load activities
      const activitiesResponse = await fetch(`${BACKEND_URL}/api/activities`);
      const activitiesData = await activitiesResponse.json();
      setActivities(activitiesData);

      loadUserEmotions();
      loadAnalytics();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadUserEmotions = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/emotions/user/${user.id}`);
      const emotions = await response.json();
      setUserEmotions(emotions);
    } catch (error) {
      console.error('Error loading emotions:', error);
    }
  };

  const loadAnalytics = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/patterns/${user.id}`);
      const analyticsData = await response.json();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  // Render appropriate view
  return (
    <div className="App">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'signup' && <SignupPage />}
      {currentView === 'app' && user && <MainApp />}
    </div>
  );
}

export default App;