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

  // Landing page component
  const LandingPage = () => (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <img src="https://customer-assets.emergentagent.com/job_0a105801-b55a-4071-b353-d7cbf88316c3/artifacts/web1oksp_logo%201.png" alt="Pome" className="logo" />
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
            <div className="feature-icon">🎯</div>
            <h3>Track Your Emotions</h3>
            <p>Log your emotional states using our science-based quadrant system to understand your patterns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Identify Triggers</h3>
            <p>Discover what situations, people, or activities consistently affect your emotional state</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Build Resourceful Activities</h3>
            <p>Create a personalized toolkit of activities across five energy categories that help you thrive</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>See Your Progress</h3>
            <p>Get insights into your emotional patterns and see which activities work best for you</p>
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
        <p>Your feedback is valuable! Let us know what features would help you most.</p>
        <div className="feedback-form">
          <div style={{
            border: '2px dashed #d2691e',
            padding: '3rem',
            borderRadius: '15px',
            textAlign: 'center',
            backgroundColor: '#f5e6d3',
            color: '#8b4513'
          }}>
            <h3 style={{marginBottom: '1rem'}}>📝 Google Form Integration</h3>
            <p>Replace this placeholder with your actual Google Form embed code.</p>
            <p style={{fontSize: '0.9rem', marginTop: '1rem'}}>
              To integrate: Create your Google Form → Send → Embed → Copy HTML → Replace the iframe below
            </p>
          </div>
          {/* 
          <iframe 
            src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
            width="100%" 
            height="600" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            title="Feedback Form"
          >
            Loading feedback form...
          </iframe>
          */}
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
          <img src="https://customer-assets.emergentagent.com/job_0a105801-b55a-4071-b353-d7cbf88316c3/artifacts/web1oksp_logo%201.png" alt="Pome" className="auth-logo" />
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
    const [emotionIntensity, setEmotionIntensity] = useState(5);
    const [emotionContext, setEmotionContext] = useState({
      location: '',
      social_setting: '',
      current_activity: ''
    });

    // Reset emotion selection when quadrant changes
    useEffect(() => {
      setSelectedEmotion('');
      setEmotionIntensity(5);
      setEmotionContext({ location: '', social_setting: '', current_activity: '' });
    }, [selectedQuadrant]);

    const handleQuadrantSelect = (quadrant) => {
      setSelectedQuadrant(quadrant);
    };

    const handleEmotionSelect = (emotion) => {
      setSelectedEmotion(emotion);
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
            intensity: emotionIntensity,
            context: emotionContext
          })
        });
        
        // Reset form
        setSelectedQuadrant('');
        setSelectedEmotion('');
        setEmotionIntensity(5);
        setEmotionContext({ location: '', social_setting: '', current_activity: '' });
        
        // Reload user emotions
        loadUserEmotions();
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
          <img src="https://customer-assets.emergentagent.com/job_0a105801-b55a-4071-b353-d7cbf88316c3/artifacts/web1oksp_logo%201.png" alt="Pome" className="app-logo" />
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
                  {Object.keys(emotionQuadrants).map(quadrant => (
                    <button
                      key={quadrant}
                      className={selectedQuadrant === quadrant ? 'quadrant-button active' : 'quadrant-button'}
                      onClick={() => setSelectedQuadrant(quadrant)}
                    >
                      <div className="quadrant-title">{quadrantDisplayNames[quadrant]}</div>
                      <div className="quadrant-emotions">
                        {emotionQuadrants[quadrant]?.slice(0, 3).join(', ')}...
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Emotion */}
              {selectedQuadrant && emotionQuadrants[selectedQuadrant] && (
                <div className="emotion-selection">
                  <h3>Which specific emotion?</h3>
                  <div className="emotion-buttons">
                    {emotionQuadrants[selectedQuadrant].map(emotion => (
                      <button
                        key={emotion}
                        className={selectedEmotion === emotion ? 'emotion-button active' : 'emotion-button'}
                        onClick={() => setSelectedEmotion(emotion)}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Intensity */}
              {selectedEmotion && (
                <div className="intensity-selection">
                  <h3>Intensity (1-10):</h3>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={emotionIntensity}
                    onChange={(e) => setEmotionIntensity(parseInt(e.target.value))}
                    className="intensity-slider"
                  />
                  <div className="intensity-value">{emotionIntensity}</div>
                </div>
              )}

              {/* Context */}
              {selectedEmotion && (
                <div className="context-section">
                  <h3>Context (Optional):</h3>
                  <div className="context-inputs">
                    <input
                      type="text"
                      placeholder="Where are you? (home, work, outside, etc.)"
                      value={emotionContext.location}
                      onChange={(e) => setEmotionContext({...emotionContext, location: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Who are you with? (alone, family, friends, etc.)"
                      value={emotionContext.social_setting}
                      onChange={(e) => setEmotionContext({...emotionContext, social_setting: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="What were you doing? (working, relaxing, etc.)"
                      value={emotionContext.current_activity}
                      onChange={(e) => setEmotionContext({...emotionContext, current_activity: e.target.value})}
                    />
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
                      <span className="emotion-intensity">Intensity: {emotion.intensity}</span>
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
              <p>Choose activities that help you feel more resourceful and resilient:</p>
              
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
                    <button className="add-activity-button">
                      Add to My Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'analytics' && (
            <div className="analytics-section">
              <h2>Your Emotional Patterns</h2>
              
              {analytics && (
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
      // Load emotion quadrants
      const quadrantsResponse = await fetch(`${BACKEND_URL}/api/emotion-quadrants`);
      const quadrantsData = await quadrantsResponse.json();
      setEmotionQuadrants(quadrantsData);

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