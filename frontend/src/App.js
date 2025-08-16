import React, { useState, useEffect } from 'react';
import './App.css';

// Emotion data - 4 quadrants with 9 emotions each
const EMOTION_DATA = {
  'high_energy_low_pleasant': {
    name: 'High Energy / Low Pleasantness',
    emotions: [
      { name: 'Annoyed', description: 'Feeling bothered or irritated' },
      { name: 'Embarrassed', description: 'Feeling self-conscious or ashamed' },
      { name: 'Contempt', description: 'Feeling disdain or superiority' },
      { name: 'Frustrated', description: 'Feeling blocked or thwarted' },
      { name: 'Angry', description: 'Feeling intense displeasure' },
      { name: 'Enraged', description: 'Feeling extremely angry' },
      { name: 'Afraid', description: 'Feeling fear or anxiety' },
      { name: 'Panicked', description: 'Feeling sudden overwhelming fear' },
      { name: 'Anxious', description: 'Feeling worried or uneasy' }
    ]
  },
  'high_energy_high_pleasant': {
    name: 'High Energy / High Pleasantness',
    emotions: [
      { name: 'Amused', description: 'Feeling entertained or delighted' },
      { name: 'Interested', description: 'Feeling curious or engaged' },
      { name: 'Surprised', description: 'Feeling unexpected wonder' },
      { name: 'Happy', description: 'Feeling joy or contentment' },
      { name: 'Delighted', description: 'Feeling great pleasure' },
      { name: 'Joyful', description: 'Feeling intense happiness' },
      { name: 'Hopeful', description: 'Feeling optimistic about the future' },
      { name: 'Excited', description: 'Feeling enthusiastic anticipation' },
      { name: 'Curious', description: 'Feeling eager to learn or know' }
    ]
  },
  'low_energy_low_pleasant': {
    name: 'Low Energy / Low Pleasantness',
    emotions: [
      { name: 'Sad', description: 'Feeling sorrow or unhappiness' },
      { name: 'Guilty', description: 'Feeling responsibility for wrongdoing' },
      { name: 'Ashamed', description: 'Feeling deep embarrassment' },
      { name: 'Disgusted', description: 'Feeling revulsion or distaste' },
      { name: 'Unhappy', description: 'Feeling dissatisfied or sorrowful' },
      { name: 'Bored', description: 'Feeling weary from lack of interest' },
      { name: 'Lonely', description: 'Feeling isolated or alone' },
      { name: 'Fatigued', description: 'Feeling extremely tired' },
      { name: 'Grief', description: 'Feeling deep sorrow from loss' }
    ]
  },
  'low_energy_high_pleasant': {
    name: 'Low Energy / High Pleasantness',
    emotions: [
      { name: 'Affectionate', description: 'Feeling fond or caring' },
      { name: 'Calm', description: 'Feeling peaceful and tranquil' },
      { name: 'Peaceful', description: 'Feeling serene and undisturbed' },
      { name: 'Content', description: 'Feeling satisfied and at ease' },
      { name: 'Grateful', description: 'Feeling thankful and appreciative' },
      { name: 'Loved', description: 'Feeling cherished and valued' },
      { name: 'Relaxed', description: 'Feeling free from tension' },
      { name: 'Relieved', description: 'Feeling freed from anxiety' },
      { name: 'Secure', description: 'Feeling safe and protected' }
    ]
  }
};

// Activities data - Updated focused list for emotional wellness
const ACTIVITIES = [
  // Physical Energy
  { id: 1, name: "Gym workout", categories: ["physical"] },
  { id: 2, name: "Yoga", categories: ["physical"] },
  { id: 3, name: "Beach walk", categories: ["physical", "natural"] },
  { id: 4, name: "Dancing", categories: ["physical", "social"] },
  { id: 5, name: "Swimming", categories: ["physical"] },
  { id: 6, name: "Hiking", categories: ["physical", "natural"] },
  { id: 7, name: "Running", categories: ["physical"] },
  { id: 8, name: "Cycling", categories: ["physical"] },
  { id: 9, name: "Stretching", categories: ["physical"] },
  { id: 10, name: "Long walks", categories: ["physical"] },
  
  // Emotional Energy
  { id: 11, name: "Write in journal", categories: ["emotional"] },
  { id: 12, name: "Organize/declutter space", categories: ["emotional"] },
  { id: 13, name: "Gratitude journaling", categories: ["emotional"] },
  { id: 14, name: "Listen to music", categories: ["emotional"] },
  { id: 15, name: "Art/creative activities", categories: ["emotional"] },
  { id: 16, name: "Reading", categories: ["emotional"] },
  { id: 17, name: "Cooking", categories: ["emotional"] },
  { id: 18, name: "Watch a movie", categories: ["emotional"] },
  { id: 19, name: "Therapy", categories: ["emotional"] },
  { id: 20, name: "Seeing new places", categories: ["emotional"] },
  
  // Social Energy
  { id: 21, name: "Call a friend", categories: ["social"] },
  { id: 22, name: "Play with children", categories: ["social"] },
  { id: 23, name: "Meet friends", categories: ["social"] },
  { id: 24, name: "Family dinner", categories: ["social"] },
  { id: 25, name: "Team sports", categories: ["social", "physical"] },
  { id: 26, name: "A date", categories: ["social"] },
  { id: 27, name: "Volunteering", categories: ["social"] },
  { id: 28, name: "Time with a significant other", categories: ["social"] },
  
  // Natural Energy
  { id: 29, name: "Gardening", categories: ["natural"] },
  { id: 30, name: "Sunrise/sunset watching", categories: ["natural"] },
  { id: 31, name: "Outdoor picnic", categories: ["natural"] },
  { id: 32, name: "Time outside", categories: ["natural"] },
  
  // Spiritual Energy
  { id: 33, name: "Prayer/meditation", categories: ["spiritual"] },
  { id: 34, name: "Religious service", categories: ["spiritual"] },
  { id: 35, name: "Spiritual reading", categories: ["spiritual"] },
  { id: 36, name: "Working on a mission", categories: ["spiritual"] },
  
  // Additional Wellness Activities
  { id: 37, name: "Massage", categories: ["physical"] },
  { id: 38, name: "Good sleep", categories: ["physical"] },
  { id: 39, name: "Spa", categories: ["physical"] },
  { id: 40, name: "Practice breathing exercises", categories: ["physical"] }
];

// Context options
const CONTEXT_OPTIONS = {
  location: ["Home", "Work", "School", "Gym", "Outside", "Restaurant", "Traveling", "Shopping", "Transport"],
  social_setting: ["By myself", "Family", "Friends", "Colleagues", "Strangers", "Partner", "Children"],
  current_activity: ["Working", "Relaxing", "Exercising", "Socializing", "Learning", "Eating", "Commuting", "Shopping", "Entertainment"]
};

function App() {
  // Main app state
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'app'
  const [currentSection, setCurrentSection] = useState('emotions'); // 'emotions', 'activities', 'analytics'
  const [user, setUser] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  // Emotion tracking state
  const [selectedQuadrant, setSelectedQuadrant] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [emotionContext, setEmotionContext] = useState({
    location: '',
    social_setting: '',
    current_activity: ''
  });

  // Activities state
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('pome_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setCurrentView('app');
      
      // Load selected activities
      const savedActivities = localStorage.getItem('pome_selected_activities');
      if (savedActivities) {
        setSelectedActivities(JSON.parse(savedActivities));
      }
    }
  }, []);

  // Handle user signup
  const handleSignup = (name, email) => {
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('pome_user', JSON.stringify(userData));
    
    setUser(userData);
    setCurrentView('app');
    
    // Reset signup form
    setSignupName('');
    setSignupEmail('');
  };

  // Handle quadrant selection
  const handleQuadrantSelect = (quadrant) => {
    setSelectedQuadrant(quadrant);
    setSelectedEmotion('');
    setEmotionContext({ location: '', social_setting: '', current_activity: '' });
  };

  // Handle emotion selection
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  // Handle context selection
  const handleContextSelect = (type, value) => {
    setEmotionContext(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  // Log emotion
  const logEmotion = () => {
    if (!selectedQuadrant || !selectedEmotion) return;

    const emotionEntry = {
      id: Date.now().toString(),
      userId: user.id,
      quadrant: selectedQuadrant,
      emotion: selectedEmotion,
      context: { ...emotionContext },
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const existingEmotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    existingEmotions.push(emotionEntry);
    localStorage.setItem('pome_emotions', JSON.stringify(existingEmotions));

    // Reset form
    setSelectedQuadrant('');
    setSelectedEmotion('');
    setEmotionContext({ location: '', social_setting: '', current_activity: '' });

    // Show success message with emotion details
    alert(`✨ Emotion logged successfully!\n\nYou felt: ${selectedEmotion}\nFrom: ${EMOTION_DATA[selectedQuadrant].name}\n\nThank you for taking time to check in with yourself. Your emotional awareness is growing! 🌱`);
  };

  // Handle add activity to plan
  const handleAddActivity = (activity) => {
    if (selectedActivities.find(a => a.id === activity.id)) return;

    const newSelectedActivities = [...selectedActivities, activity];
    setSelectedActivities(newSelectedActivities);
    
    // Save to localStorage
    localStorage.setItem('pome_selected_activities', JSON.stringify(newSelectedActivities));
    
    alert(`${activity.name} added to your plan! 🎉`);
  };

  // Handle remove activity from plan
  const handleRemoveActivity = (activityId) => {
    const newSelectedActivities = selectedActivities.filter(a => a.id !== activityId);
    setSelectedActivities(newSelectedActivities);
    
    // Save to localStorage
    localStorage.setItem('pome_selected_activities', JSON.stringify(newSelectedActivities));
    
    alert('Activity removed from your plan');
  };

  // Get analytics data
  const getAnalyticsData = () => {
    const emotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    
    // Basic analytics
    const totalEmotions = emotions.length;
    const totalActivities = selectedActivities.length;
    
    // Emotion patterns (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentEmotions = emotions.filter(e => new Date(e.timestamp) >= lastWeek);
    
    // Group by quadrant
    const quadrantCounts = recentEmotions.reduce((acc, emotion) => {
      acc[emotion.quadrant] = (acc[emotion.quadrant] || 0) + 1;
      return acc;
    }, {});

    // Get all emotions for detailed view
    const allEmotionsList = emotions.map(e => ({
      emotion: e.emotion,
      quadrant: e.quadrant,
      context: e.context,
      timestamp: new Date(e.timestamp).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })).reverse(); // Most recent first

    return {
      totalEmotions,
      totalActivities,
      recentEmotions: recentEmotions.length,
      quadrantCounts,
      hasData: totalEmotions > 0 || totalActivities > 0,
      allEmotionsList,
      allActivitiesList: selectedActivities
    };
  };

  // Render landing page
  const renderLandingPage = () => (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <h1>pome</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Emotional Intelligence</h1>
          <p className="hero-subtitle">
            Empower yourself with tools to track emotional states, identify triggers, and discover activities that shift you into a more resourceful, resilient mindset. This is your journey, one loving check-in at a time.
          </p>
          <button 
            className="cta-button"
            onClick={() => setCurrentView('signup')}
          >
            START YOUR JOURNEY
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Pome?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Emotion Tracking</h3>
              <p>Use the scientifically-backed Circumplex Model to identify and track your emotional states with precision.</p>
            </div>
            <div className="feature-card">
              <h3>Activity Planning</h3>
              <p>Discover and plan resourceful activities across 5 energy categories to boost your emotional well-being.</p>
            </div>
            <div className="feature-card">
              <h3>Personal Insights</h3>
              <p>Get personalized analytics about your emotional patterns and activity effectiveness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial">
            <p>"Pome has helped me see the patterns in my emotions: what I feel, when I feel it, and why. I love keeping track of the little things that bring me energy and light. It's more than just tracking, it's feeling like I truly own my life again."</p>
            <div className="testimonial-author">
              <strong>— Early Tester</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of women building their emotional intelligence with Pome.</p>
          <button 
            className="cta-button"
            onClick={() => setCurrentView('signup')}
          >
            START TRACKING
          </button>
          
          <div className="feedback-section">
            <button 
              className="feedback-cta-button"
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            >
              LEAVE FEEDBACK
            </button>
            
            {showFeedbackForm && (
              <div className="feedback-form-container">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfimMroes1U1ho1k3nNmVuJHPxDXp_CcYWl4GTgyFkmqxHotQ/viewform?embedded=true" 
                  width="640" 
                  height="2001" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  title="Feedback Form"
                >
                  Loading…
                </iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <div className="container">
          <div className="social-links">
            <a href="https://www.instagram.com/pome_app" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>📸</span> Follow us on Instagram
            </a>
            <a href="https://t.me/+q1qz-pSOEiNjZGFh" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>💬</span> Join our Telegram group to be part of the Pome app building community
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  // Render signup page
  const renderSignupPage = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (signupName.trim() && signupEmail.trim()) {
        handleSignup(signupName.trim(), signupEmail.trim());
      }
    };

    return (
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Welcome to Your Journey</h1>
            <p>Let's get you started with building your emotional intelligence</p>
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              START TRACKING
            </button>
          </form>

          <button 
            className="back-button"
            onClick={() => setCurrentView('landing')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  };

  // Render main app
  const renderMainApp = () => (
    <div className="main-app">
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <h1>pome</h1>
        </div>
        <div className="user-info">
          <span>Hello, {user.name}!</span>
        </div>
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
        {currentSection === 'emotions' && renderEmotionsSection()}
        {currentSection === 'activities' && renderActivitiesSection()}
        {currentSection === 'analytics' && renderAnalyticsSection()}
      </main>
    </div>
  );

  // Render emotions section
  const renderEmotionsSection = () => (
    <div className="emotions-section">
      <div className="section-header">
        <h2>Track Emotions</h2>
        <p>Pause your busy life for a moment. Take a deep breath and ask yourself what emotion you're feeling right now. Choose your emotion from the four quadrants below and let the questions guide you deeper into reflection. Do this exercise multiple times a day because we feel different emotions throughout a day. Remember: your emotional awareness is the first step toward building lasting resilience.</p>
      </div>

      {/* Quadrant Selection */}
      {!selectedQuadrant && (
        <div className="quadrant-container">
          <h3>Choose Your Current Energy Level</h3>
          <div className="quadrant-grid">
            {Object.keys(EMOTION_DATA).map(quadrant => (
              <button
                key={quadrant}
                className="quadrant-button"
                onClick={() => handleQuadrantSelect(quadrant)}
              >
                <div className="quadrant-title">{EMOTION_DATA[quadrant].name}</div>
                <div className="quadrant-emotions">
                  {EMOTION_DATA[quadrant].emotions.map(emotion => emotion.name).join(', ')}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emotion Selection */}
      {selectedQuadrant && !selectedEmotion && (
        <div className="emotion-selection">
          <h3>Select Your Specific Emotion</h3>
          <p className="quadrant-selected">From: {EMOTION_DATA[selectedQuadrant].name}</p>
          
          <div className="emotions-grid">
            {EMOTION_DATA[selectedQuadrant].emotions.map(emotion => (
              <button
                key={emotion.name}
                className="emotion-button"
                onClick={() => handleEmotionSelect(emotion.name)}
              >
                <strong>{emotion.name}</strong>
                <span>{emotion.description}</span>
              </button>
            ))}
          </div>
          
          <button 
            className="back-button"
            onClick={() => setSelectedQuadrant('')}
          >
            ← Back to Quadrants
          </button>
        </div>
      )}

      {/* Context Selection */}
      {selectedQuadrant && selectedEmotion && (
        <div className="context-selection">
          <h3>Add Context (Optional)</h3>
          <p>Selected: <strong>{selectedEmotion}</strong> from {EMOTION_DATA[selectedQuadrant].name}</p>

          <div className="context-categories">
            <div className="context-category">
              <h4>Where are you?</h4>
              <div className="context-buttons">
                {CONTEXT_OPTIONS.location.map(option => (
                  <button
                    key={option}
                    className={emotionContext.location === option ? 'context-button active' : 'context-button'}
                    onClick={() => handleContextSelect('location', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="context-category">
              <h4>Who are you with?</h4>
              <div className="context-buttons">
                {CONTEXT_OPTIONS.social_setting.map(option => (
                  <button
                    key={option}
                    className={emotionContext.social_setting === option ? 'context-button active' : 'context-button'}
                    onClick={() => handleContextSelect('social_setting', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="context-category">
              <h4>What are you doing?</h4>
              <div className="context-buttons">
                {CONTEXT_OPTIONS.current_activity.map(option => (
                  <button
                    key={option}
                    className={emotionContext.current_activity === option ? 'context-button active' : 'context-button'}
                    onClick={() => handleContextSelect('current_activity', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="emotion-actions">
            <button className="log-emotion-button" onClick={logEmotion}>
              Log This Emotion
            </button>
            <button 
              className="back-button"
              onClick={() => setSelectedEmotion('')}
            >
              ← Back to Emotions
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Render activities section
  const renderActivitiesSection = () => (
    <div className="activities-section">
      <div className="section-header">
        <h2>Resourceful Activities</h2>
        <p>Think of your energy like a beautiful vase: it needs to be filled, cared for, and cherished. Each week, choose a handful of activities that pour life back into you. Not the tasks on your to-do list, but the moments that make you smile, breathe deeper, and feel alive.</p>
        <p>Life is busy, but you deserve space for what makes you happy. Explore different kinds of energy (physical, emotional, natural, social, and spiritual) and experiment with new ways to fill your vase. Over time, you'll discover your own personal recipe for feeling vibrant and resilient.</p>
      </div>

      {/* Selected Activities */}
      {selectedActivities.length > 0 && (
        <div className="selected-activities">
          <h3>Your Weekly Resourceful Activities ({selectedActivities.length})</h3>
          <div className="selected-activities-list">
            {selectedActivities.map(activity => (
              <div key={activity.id} className="selected-activity-item">
                <span className="activity-name">{activity.name}</span>
                <div className="activity-categories">
                  {activity.categories.map(cat => (
                    <span key={cat} className={`category-tag ${cat}`}>{cat}</span>
                  ))}
                </div>
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveActivity(activity.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Energy Categories Legend */}
      <div className="energy-legend">
        <div className="legend-item physical">Physical</div>
        <div className="legend-item emotional">Emotional</div>
        <div className="legend-item social">Social</div>
        <div className="legend-item natural">Natural</div>
        <div className="legend-item spiritual">Spiritual</div>
      </div>

      {/* Activities Grid */}
      <div className="activities-grid">
        {ACTIVITIES.map(activity => {
          const isSelected = selectedActivities.find(a => a.id === activity.id);
          
          return (
            <div key={activity.id} className="activity-card">
              <h4>{activity.name}</h4>
              <div className="activity-categories">
                {activity.categories.map(category => (
                  <span key={category} className={`category-tag ${category}`}>
                    {category}
                  </span>
                ))}
              </div>
              <button 
                className={isSelected ? 'add-activity-button added' : 'add-activity-button'}
                onClick={() => isSelected ? handleRemoveActivity(activity.id) : handleAddActivity(activity)}
              >
                {isSelected ? 'Added to Plan ✓' : 'Add to My Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render analytics section
  const renderAnalyticsSection = () => {
    const analytics = getAnalyticsData();

    return (
      <div className="analytics-section">
        <div className="section-header">
          <h2>Your Emotional & Activity Patterns</h2>
          <p>Insights into your emotional journey and activity engagement.</p>
        </div>

        {!analytics.hasData ? (
          <div className="empty-state">
            <h3>Start Building Your Insights</h3>
            <p>Your analytics will appear here once you:</p>
            <ul>
              <li>Log at least 5 emotions</li>
              <li>Add some activities to your plan</li>
            </ul>
            <p>Keep tracking to see personalized patterns and recommendations!</p>
          </div>
        ) : (
          <div className="analytics-content">
            {/* Summary Cards */}
            <div className="analytics-summary">
              <div className="summary-card">
                <h3>{analytics.totalEmotions}</h3>
                <p>Emotions Logged</p>
              </div>
              <div className="summary-card">
                <h3>{analytics.totalActivities}</h3>
                <p>Activities in Plan</p>
              </div>
              <div className="summary-card">
                <h3>{analytics.recentEmotions}</h3>
                <p>Emotions This Week</p>
                <small>Last 7 days</small>
              </div>
            </div>

            {/* Emotion Patterns */}
            {analytics.recentEmotions > 0 && (
              <div className="emotion-patterns">
                <h3>Recent Emotion Patterns</h3>
                <div className="quadrant-breakdown">
                  {Object.keys(EMOTION_DATA).map(quadrant => {
                    const count = analytics.quadrantCounts[quadrant] || 0;
                    const percentage = analytics.recentEmotions > 0 ? Math.round((count / analytics.recentEmotions) * 100) : 0;
                    
                    return count > 0 ? (
                      <div key={quadrant} className="quadrant-stat">
                        <div className="quadrant-name">{EMOTION_DATA[quadrant].name}</div>
                        <div className="quadrant-count">{count} times ({percentage}%)</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Activity Categories */}
            {analytics.totalActivities > 0 && (
              <div className="activity-breakdown">
                <h3>Your Activity Focus</h3>
                <div className="category-stats">
                  {['physical', 'emotional', 'social', 'natural', 'spiritual'].map(category => {
                    const count = selectedActivities.filter(activity => 
                      activity.categories.includes(category)
                    ).length;
                    
                    return count > 0 ? (
                      <div key={category} className="category-stat">
                        <span className={`category-tag ${category}`}>{category}</span>
                        <span className="category-count">{count} activities</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Past Emotions History */}
            {analytics.totalEmotions > 0 && (
              <div className="emotions-history">
                <h3>Your Emotion Journey</h3>
                <div className="emotions-list">
                  {analytics.allEmotionsList.slice(0, 10).map((entry, index) => (
                    <div key={index} className="emotion-history-item">
                      <div className="emotion-info">
                        <strong>{entry.emotion}</strong>
                        <span className="quadrant-label">
                          {EMOTION_DATA[entry.quadrant]?.name}
                        </span>
                      </div>
                      <div className="emotion-context">
                        {entry.context.location && <span className="context-tag">📍 {entry.context.location}</span>}
                        {entry.context.social_setting && <span className="context-tag">👥 {entry.context.social_setting}</span>}
                        {entry.context.current_activity && <span className="context-tag">🏃 {entry.context.current_activity}</span>}
                      </div>
                      <div className="emotion-timestamp">{entry.timestamp}</div>
                    </div>
                  ))}
                  {analytics.allEmotionsList.length > 10 && (
                    <p className="show-more-hint">Showing 10 most recent emotions of {analytics.totalEmotions} total</p>
                  )}
                </div>
              </div>
            )}

            {/* Past Activities History */}
            {analytics.totalActivities > 0 && (
              <div className="activities-history">
                <h3>Your Activity Plan</h3>
                <div className="activities-list">
                  {analytics.allActivitiesList.map((activity, index) => (
                    <div key={index} className="activity-history-item">
                      <span className="activity-name">{activity.name}</span>
                      <div className="activity-categories">
                        {activity.categories.map(cat => (
                          <span key={cat} className={`category-tag ${cat}`}>{cat}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Main render
  if (currentView === 'landing') {
    return renderLandingPage();
  } else if (currentView === 'signup') {
    return renderSignupPage();
  } else if (currentView === 'app' && user) {
    return renderMainApp();
  }

  return null;
}

export default App;