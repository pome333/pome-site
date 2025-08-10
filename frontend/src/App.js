import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Global debug variable
window.debugClickCount = 0;

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentSection, setCurrentSection] = useState('emotions'); // Move navigation state to parent
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [userEmotions, setUserEmotions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activityAnalytics, setActivityAnalytics] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Updated emotion data based on the provided quadrant image - showing ALL emotions
  const EMOTION_DATA = {
    "high_energy_low_pleasant": {
      "Annoyed": "Feeling mildly irritated or bothered by something",
      "Embarrassed": "Feeling self-conscious or ashamed due to a mistake or awkward situation", 
      "Contempt": "Feeling that someone or something is worthless or beneath consideration",
      "Frustrated": "Being upset due to inability to change or achieve something",
      "Angry": "Feeling strong displeasure or hostility",
      "Enraged": "Extremely angry, filled with rage",
      "Afraid": "Feeling fear or anxiety about something threatening",
      "Panicked": "Feeling sudden uncontrollable fear or anxiety",
      "Anxious": "Feeling worried, nervous, or uneasy about something"
    },
    "high_energy_high_pleasant": {
      "Amused": "Finding something funny or entertaining",
      "Interested": "Feeling curious or wanting to learn more about something",
      "Surprised": "Feeling unexpected wonder or amazement", 
      "Happy": "Feeling joy, pleasure, or contentment",
      "Delighted": "Feeling great pleasure and satisfaction",
      "Joyful": "Feeling great happiness and triumph",
      "Hopeful": "Feeling optimistic about the future",
      "Excited": "Feeling eager enthusiasm and anticipation",
      "Curious": "Eager to know or learn something new"
    },
    "low_energy_low_pleasant": {
      "Sad": "Feeling sorrow or unhappiness",
      "Guilty": "Feeling responsible for wrongdoing or failure",
      "Ashamed": "Feeling embarrassed or guilty about something",
      "Disgusted": "Feeling revulsion or strong disapproval",
      "Unhappy": "Not pleased or satisfied; feeling sad",
      "Bored": "Feeling weary and impatient due to lack of interest",
      "Lonely": "Feeling sad due to lack of companionship",
      "Fatigued": "Extreme tiredness and lack of energy",
      "Grief": "Deep sorrow over loss"
    },
    "low_energy_high_pleasant": {
      "Affectionate": "Feeling fond and loving toward someone",
      "Calm": "Peaceful, relaxed, and untroubled",
      "Peaceful": "Free from disturbance; tranquil",
      "Content": "Satisfied and at ease with circumstances",
      "Grateful": "Being thankful and appreciative",
      "Loved": "Feeling cared for and cherished",
      "Relaxed": "Free from tension and anxiety",
      "Relieved": "Feeling reassured after anxiety or distress",
      "Secure": "Feeling safe, stable, and protected"
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
            "Understanding my emotional patterns has been life-changing. I now know exactly which activities help me feel more resourceful and content."
          </blockquote>
          <cite>— Veranika, Beta User</cite>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="feedback-section">
        <h2>Help Us Improve</h2>
        <p>Your feedback is valuable! Let us know what features would help you most on your emotional intelligence journey.</p>
        
        {!showFeedbackForm ? (
          <button 
            className="feedback-cta-button"
            onClick={() => setShowFeedbackForm(true)}
          >
            Leave Feedback
          </button>
        ) : null}

        <div className={`feedback-form ${showFeedbackForm ? 'show' : ''}`}>
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

      {/* Social Links Section */}
      <section className="social-section">
        <h2>Connect with Pome</h2>
        <div className="social-links">
          <a 
            href="https://www.instagram.com/pome_app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <span className="social-icon">📸</span>
            Follow us on Instagram for daily emotional wellness tips and inspiration
          </a>
          <a 
            href="https://t.me/+q1qz-pSOEiNjZGFh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <span className="social-icon">💬</span>
            Join the Pome App group on Telegram to stay connected and learn about new features and be part of the early Pome app adopters!
          </a>
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
    // Local state for emotion tracking flow
    const [selectedQuadrant, setSelectedQuadrant] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [emotionContext, setEmotionContext] = useState({
      location: '',
      social_setting: '',
      current_activity: ''
    });
    const [userActivities, setUserActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    // Clean up console logging
    console.log('🔧 MainApp render - currentSection:', currentSection);
    console.log('🔧 selectedQuadrant:', selectedQuadrant);
    
    // Use useEffect to monitor currentSection changes
    useEffect(() => {
      console.log('🔍 currentSection changed to:', currentSection);
    }, [currentSection]); // Debug log


    // Use useEffect to monitor currentSection changes
    useEffect(() => {
      console.log('🔍 useEffect: currentSection changed to:', currentSection);
    }, [currentSection]);

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
        
        // Create selected activities array with full activity details
        const selectedActIds = userActData.map(ua => ua.activity_id);
        const selectedActDetails = activities.filter(act => selectedActIds.includes(act.id));
        setSelectedActivities(selectedActDetails.map(act => ({
          ...act,
          user_activity_id: userActData.find(ua => ua.activity_id === act.id)?.id
        })));
      } catch (error) {
        console.error('Error loading user activities:', error);
      }
    };

    // Load user activities on component mount and when activities change
    useEffect(() => {
      if (activities.length > 0) {
        loadUserActivities();
      }
    }, [user, activities]);

    // Load activity analytics function inside MainApp component
    const loadActivityAnalytics = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${BACKEND_URL}/api/analytics/activities/${user.id}`);
        const activityAnalyticsData = await response.json();
        setActivityAnalytics(activityAnalyticsData);
      } catch (error) {
        console.error('Error loading activity analytics:', error);
      }
    };

    // Load activity analytics on component mount
    useEffect(() => {
      if (user) {
        loadActivityAnalytics();
      }
    }, [user]);

    const handleQuadrantSelect = (quadrant) => {
      console.log('🎯 Quadrant selected:', quadrant);
      setSelectedQuadrant(quadrant);
      console.log('🎯 selectedQuadrant state should now be:', quadrant);
      // Reset other states when new quadrant selected
      setSelectedEmotion('');
      setEmotionContext({
        location: '',
        social_setting: '',
        current_activity: ''
      });
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
          const result = await response.json();
          setSelectedActivities(prev => [...prev, {
            ...activity,
            user_activity_id: result.id
          }]);
          loadUserActivities();
          loadActivityAnalytics(); // Load analytics after adding activity
        }
      } catch (error) {
        console.error('Error adding activity:', error);
      }
    };

    const handleRemoveActivity = async (activity) => {
      try {
        // Find the user activity ID
        const userActivity = userActivities.find(ua => ua.activity_id === activity.id);
        if (!userActivity) return;

        // Remove from selected activities immediately (optimistic update)
        setSelectedActivities(prev => prev.filter(act => act.id !== activity.id));

        // Note: We would need a DELETE endpoint to properly remove from database
        // For now, we'll just remove from the UI
        
        loadUserActivities();
        loadActivityAnalytics(); // Reload analytics after removing activity
      } catch (error) {
        console.error('Error removing activity:', error);
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
        loadActivityAnalytics();
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔥 Track Emotions clicked');
              setCurrentSection('emotions');
            }}
          >
            Track Emotions
          </button>
          <button 
            className={currentSection === 'activities' ? 'nav-button active' : 'nav-button'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔥 Activities clicked');
              setCurrentSection('activities');
            }}
          >
            Activities
          </button>
          <button 
            className={currentSection === 'analytics' ? 'nav-button active' : 'nav-button'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔥 Analytics clicked');
              setCurrentSection('analytics');
            }}
          >
            Analytics
          </button>
        </nav>

        {/* Main Content */}
        <main className="app-main">
          {console.log('🔍 Rendering sections - currentSection is:', currentSection)}
          {console.log('🔍 emotions condition:', currentSection === 'emotions')}
          {console.log('🔍 activities condition:', currentSection === 'activities')}
          {console.log('🔍 analytics condition:', currentSection === 'analytics')}
          
          {currentSection === 'emotions' && (
            <div className="emotions-section">
              <h2>How are you feeling right now?</h2>
              
              <div className="intro-text">
                <p>
                  Stop your busy life for a moment, take a deep breath, and ask yourself how you are feeling right now. 
                  Pick the right quadrant and the emotion. Reflect on it and try to understand what triggered it. 
                  Answer the questions what you were doing when you felt it, whom you were with and where – this will help you in reflection.
                </p>
                <p>
                  We recommend doing it multiple times because we feel different emotions throughout a day. 
                  Do this exercise every day for at least 2 weeks. Self-reflection will help you understand yourself better, 
                  your moods, and triggers.
                </p>
              </div>
              
              {/* Quadrant Selection */}
              <div className="quadrant-selection">
                <h3>Select Your Energy Quadrant:</h3>
                <div className="quadrant-grid">
                  {Object.keys(EMOTION_DATA).map(quadrant => (
                    <button
                      key={quadrant}
                      className={selectedQuadrant === quadrant ? 'quadrant-button active' : 'quadrant-button'}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔥 QUADRANT CLICKED:', quadrant);
                        handleQuadrantSelect(quadrant);
                      }}
                    >
                      <div className="quadrant-title">{quadrantDisplayNames[quadrant]}</div>
                      <div className="quadrant-emotions">
                        {Object.keys(EMOTION_DATA[quadrant]).join(', ')}
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
              <p className="subtitle">
                Select resourceful activities that give you an energy boost. Everyone responds differently to activities, so experiment to find what works best for you. 
                Aim to incorporate these activities weekly to maintain your emotional well-being and energy levels. These aren't all your activities - just the ones that make you feel more resourceful and resilient.
              </p>

              {/* Selected Activities */}
              {selectedActivities.length > 0 && (
                <div className="selected-activities">
                  <h3>Your Weekly Resourceful Activities ({selectedActivities.length})</h3>
                  <div className="selected-activities-grid">
                    {selectedActivities.map(activity => (
                      <div key={activity.id} className="selected-activity-card">
                        <h4>{activity.name}</h4>
                        <div className="selected-activity-categories">
                          {activity.energy_categories.map(category => (
                            <span key={category} className={`category-tag ${category}`}>
                              {category}
                            </span>
                          ))}
                        </div>
                        <button 
                          className="remove-activity-button"
                          onClick={() => handleRemoveActivity(activity)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
                      className={selectedActivities.some(sa => sa.id === activity.id) ? 'add-activity-button added' : 'add-activity-button'}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔥 ADD TO PLAN clicked for:', activity.name);
                        handleAddActivity(activity);
                      }}
                      disabled={selectedActivities.some(sa => sa.id === activity.id)}
                    >
                      {selectedActivities.some(sa => sa.id === activity.id) ? 'Added to Plan ✓' : 'Add to My Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 'analytics' && (
            <div className="analytics-section">
              <h2>Your Emotional & Activity Patterns</h2>
              
              {(!analytics || analytics.total_entries < 5) && (!activityAnalytics || activityAnalytics.total_activities_added === 0) ? (
                <div className="empty-analytics">
                  <h3>📊 Analytics Coming Soon</h3>
                  <p>Check in with your emotions and add activities to see patterns emerge.</p>
                  <p>We'll show your insights after you've logged at least 5 emotions and added some activities!</p>
                  <p>Keep tracking to unlock powerful insights about your emotional well-being and activity effectiveness.</p>
                </div>
              ) : (
                <div className="analytics-content">
                  {/* Show message if we have some data but not complete */}
                  {((!analytics || analytics.total_entries < 5) || (!activityAnalytics || activityAnalytics.total_activities_added === 0)) && (
                    <div className="analytics-card">
                      <h3>📊 Building Your Analytics</h3>
                      <div className="analytics-progress">
                        <div className="progress-item">
                          <span className="progress-label">Emotions logged:</span>
                          <span className="progress-value">
                            {analytics?.total_entries || 0}/5 
                            {analytics?.total_entries >= 5 ? " ✅" : ""}
                          </span>
                        </div>
                        <div className="progress-item">
                          <span className="progress-label">Activities added:</span>
                          <span className="progress-value">
                            {activityAnalytics?.total_activities_added || 0}
                            {activityAnalytics?.total_activities_added > 0 ? " ✅" : ""}
                          </span>
                        </div>
                      </div>
                      <p>Keep adding data to unlock more detailed insights!</p>
                    </div>
                  )}

                  {/* Emotion Analytics */}
                  {analytics && analytics.total_entries >= 5 && (
                    <>
                      <div className="analytics-card">
                        <h3>Emotional Quadrant Distribution</h3>
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
                        <h3>Emotional Triggers</h3>
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
                    </>
                  )}

                  {/* Activity Analytics */}
                  {activityAnalytics && activityAnalytics.total_activities_added > 0 && (
                    <>
                      <div className="analytics-card">
                        <h3>Activity Overview</h3>
                        <div className="activity-overview">
                          <div className="stat-item">
                            <span className="stat-label">Total Activities Added:</span>
                            <span className="stat-value">{activityAnalytics.total_activities_added}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Completion Rate:</span>
                            <span className="stat-value">{activityAnalytics.completion_rate}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="analytics-card">
                        <h3>Activity Distribution by Category</h3>
                        <div className="category-stats">
                          {Object.entries(activityAnalytics.category_distribution)
                            .sort(([,a], [,b]) => b - a)
                            .map(([category, count]) => (
                              <div key={category} className="stat-item">
                                <span className="stat-label">
                                  <span className={`category-indicator ${category}`}></span>
                                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                                </span>
                                <span className="stat-value">{count}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {Object.keys(activityAnalytics.avg_effectiveness_by_category).length > 0 && (
                        <div className="analytics-card">
                          <h3>Category Effectiveness</h3>
                          <div className="effectiveness-stats">
                            {Object.entries(activityAnalytics.avg_effectiveness_by_category)
                              .sort(([,a], [,b]) => b - a)
                              .map(([category, rating]) => (
                                <div key={category} className="stat-item">
                                  <span className="stat-label">
                                    <span className={`category-indicator ${category}`}></span>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}:
                                  </span>
                                  <span className="stat-value">{rating.toFixed(1)}/10</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      <div className="analytics-card">
                        <h3>Weekly Activity Breakdown</h3>
                        <div className="weekly-stats">
                          {Object.entries(activityAnalytics.weekly_breakdown)
                            .reverse()
                            .map(([week, data]) => (
                              <div key={week} className="week-breakdown">
                                <h4>{week}: {data.total_activities} activities</h4>
                                <div className="week-categories">
                                  {Object.entries(data.category_breakdown)
                                    .filter(([,count]) => count > 0)
                                    .map(([category, count]) => (
                                      <span key={category} className={`category-tag ${category}`}>
                                        {category}: {count}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {activityAnalytics.most_effective_activities.length > 0 && (
                        <div className="analytics-card">
                          <h3>Most Effective Activities</h3>
                          <div className="effectiveness-ranking">
                            {activityAnalytics.most_effective_activities.map(([activity, rating], index) => (
                              <div key={activity} className="stat-item">
                                <span className="stat-label">
                                  {index + 1}. {activity}:
                                </span>
                                <span className="stat-value">{rating.toFixed(1)}/10</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
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
      loadActivityAnalytics();
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

  const loadActivityAnalytics = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/activities/${user.id}`);
      const activityAnalyticsData = await response.json();
      setActivityAnalytics(activityAnalyticsData);
    } catch (error) {
      console.error('Error loading activity analytics:', error);
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