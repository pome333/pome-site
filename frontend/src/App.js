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

  // Activities state - Updated to support all weeks
  const [selectedWeekView, setSelectedWeekView] = useState('current'); // For activities section
  const [analyticsWeekView, setAnalyticsWeekView] = useState('current'); // For analytics section

  // Get all weeks since user started (for activities section)
  const getAllWeeksForActivities = () => {
    const { startOfWeek: currentWeekStart } = getCalendarWeek();
    const allWeeks = getAllWeeksSinceStart();
    
    // Add current week if not in list
    const currentWeekKey = currentWeekStart.toISOString().split('T')[0];
    if (!allWeeks.includes(currentWeekKey)) {
      allWeeks.push(currentWeekKey);
    }
    
    // Add next week
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    const nextWeekKey = nextWeekStart.toISOString().split('T')[0];
    if (!allWeeks.includes(nextWeekKey)) {
      allWeeks.push(nextWeekKey);
    }
    
    return allWeeks.sort((a, b) => new Date(a) - new Date(b));
  };

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('pome_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Only auto-login if we have valid user data
        if (userData && userData.id && userData.name) {
          setUser(userData);
          setCurrentView('app');
          
          // Load weekly activities
          const savedCurrentWeekActivities = localStorage.getItem('pome_current_week_activities');
          if (savedCurrentWeekActivities) {
            setCurrentWeekActivities(JSON.parse(savedCurrentWeekActivities));
          }
          
          const savedNextWeekActivities = localStorage.getItem('pome_next_week_activities');
          if (savedNextWeekActivities) {
            setNextWeekActivities(JSON.parse(savedNextWeekActivities));
          }
        } else {
          // Clear invalid user data
          localStorage.removeItem('pome_user');
          setCurrentView('landing');
        }
      } catch (error) {
        // Clear corrupted user data
        localStorage.removeItem('pome_user');
        setCurrentView('landing');
      }
    } else {
      // No user data, show landing page
      setCurrentView('landing');
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

  // Handle add activity to current or next week
  const handleAddActivity = (activity) => {
    const currentList = selectedWeekView === 'current' ? currentWeekActivities : nextWeekActivities;
    const setCurrentList = selectedWeekView === 'current' ? setCurrentWeekActivities : setNextWeekActivities;
    const storageKey = selectedWeekView === 'current' ? 'pome_current_week_activities' : 'pome_next_week_activities';
    
    if (currentList.find(a => a.id === activity.id)) return;

    const newActivities = [...currentList, activity];
    setCurrentList(newActivities);
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(newActivities));
    
    const weekText = selectedWeekView === 'current' ? 'this week' : 'next week';
    alert(`${activity.name} added to your plan for ${weekText}! 🎉`);
  };

  // Handle remove activity from current or next week
  const handleRemoveActivity = (activityId) => {
    const currentList = selectedWeekView === 'current' ? currentWeekActivities : nextWeekActivities;
    const setCurrentList = selectedWeekView === 'current' ? setCurrentWeekActivities : setNextWeekActivities;
    const storageKey = selectedWeekView === 'current' ? 'pome_current_week_activities' : 'pome_next_week_activities';
    
    const newActivities = currentList.filter(a => a.id !== activityId);
    setCurrentList(newActivities);
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(newActivities));
    
    const weekText = selectedWeekView === 'current' ? 'this week' : 'next week';
    alert(`Activity removed from your plan for ${weekText}`);
  };

  // Helper function to get start and end of calendar week
  const getCalendarWeek = (date = new Date()) => {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    
    // Get Monday as start of week
    const dayOfWeek = currentDate.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, so we want Monday
    startOfWeek.setDate(currentDate.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return { startOfWeek, endOfWeek };
  };

  // Helper function to calculate day streak
  const calculateDayStreak = (emotions) => {
    if (emotions.length === 0) return 0;

    // Group emotions by date
    const emotionsByDate = emotions.reduce((acc, emotion) => {
      const date = new Date(emotion.timestamp).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(emotion);
      return acc;
    }, {});

    // Get unique dates and sort them
    const uniqueDates = Object.keys(emotionsByDate).sort((a, b) => new Date(b) - new Date(a));
    
    if (uniqueDates.length === 0) return 0;

    // Calculate consecutive days from today backwards
    let streak = 0;
    const today = new Date().toDateString();
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (currentDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Get analytics data with calendar week and day streak
  const getAnalyticsData = () => {
    const emotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    const currentWeekActivities = JSON.parse(localStorage.getItem('pome_current_week_activities') || '[]');
    const nextWeekActivities = JSON.parse(localStorage.getItem('pome_next_week_activities') || '[]');
    
    // Basic analytics
    const totalEmotions = emotions.length;
    
    // Calendar week emotions (this week)
    const { startOfWeek, endOfWeek } = getCalendarWeek();
    const thisWeekEmotions = emotions.filter(e => {
      const emotionDate = new Date(e.timestamp);
      return emotionDate >= startOfWeek && emotionDate <= endOfWeek;
    });

    // Day streak calculation
    const dayStreak = calculateDayStreak(emotions);

    // Group by quadrant for this week
    const quadrantCounts = thisWeekEmotions.reduce((acc, emotion) => {
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

    // Format week range
    const weekRange = `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    return {
      totalEmotions,
      thisWeekEmotions: thisWeekEmotions.length,
      currentWeekActivities: currentWeekActivities.length,
      dayStreak,
      quadrantCounts,
      hasData: totalEmotions > 0 || currentWeekActivities.length > 0,
      allEmotionsList,
      allActivitiesList: [...currentWeekActivities, ...nextWeekActivities],
      weekRange
    };
  };

  // Get week data for analytics with weekly navigation - Updated to support all week activities
  const getWeekData = (weekView) => {
    const emotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    
    let weekStart, weekEnd, weekRange;
    
    if (weekView === 'current') {
      const { startOfWeek, endOfWeek } = getCalendarWeek();
      weekStart = startOfWeek;
      weekEnd = endOfWeek;
      weekRange = `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      // Specific week selected
      weekStart = new Date(weekView);
      weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekRange = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    
    // Filter emotions for selected week
    const weekEmotions = emotions.filter(e => {
      const emotionDate = new Date(e.timestamp);
      return emotionDate >= weekStart && emotionDate <= weekEnd;
    }).map(e => ({
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
    }));
    
    // Get activities for the selected week - support all weeks
    const weekKey = weekStart.toISOString().split('T')[0];
    const weekActivitiesKey = `pome_week_activities_${weekKey}`;
    const weekActivities = JSON.parse(localStorage.getItem(weekActivitiesKey) || '[]');
    
    return {
      emotions: weekEmotions,
      activities: weekActivities,
      weekRange,
      weekKey
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
          <h3>Choose the Emotion You're Feeling Right Now</h3>
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

  // Render activities section with weekly planning
  const renderActivitiesSection = () => {
    const currentActivities = selectedWeekView === 'current' ? currentWeekActivities : nextWeekActivities;
    const { startOfWeek: currentWeekStart, endOfWeek: currentWeekEnd } = getCalendarWeek();
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(currentWeekEnd);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
    
    const currentWeekRange = `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${currentWeekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    const nextWeekRange = `${nextWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${nextWeekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    return (
      <div className="activities-section">
        <div className="section-header">
          <h2>Resourceful Activities</h2>
          <p>Think of your energy like a beautiful vase: it needs to be filled, cared for, and cherished. Each week, choose a handful of activities that pour life back into you. Not the tasks on your to-do list, but the moments that make you smile, breathe deeper, and feel alive.</p>
          <p>Life is busy, but you deserve space for what makes you happy. Explore different kinds of energy (physical, emotional, natural, social, and spiritual) and experiment with new ways to fill your vase. Over time, you'll discover your own personal recipe for feeling vibrant and resilient.</p>
        </div>

        {/* Week Selection Tabs */}
        <div className="week-selection">
          <button 
            className={selectedWeekView === 'current' ? 'week-tab active' : 'week-tab'}
            onClick={() => setSelectedWeekView('current')}
          >
            This Week
            <small>{currentWeekRange}</small>
          </button>
          <button 
            className={selectedWeekView === 'next' ? 'week-tab active' : 'week-tab'}
            onClick={() => setSelectedWeekView('next')}
          >
            Next Week
            <small>{nextWeekRange}</small>
          </button>
        </div>

        {/* Selected Activities for Current Week View */}
        {currentActivities.length > 0 && (
          <div className="selected-activities">
            <h3>Your Activities for {selectedWeekView === 'current' ? 'This Week' : 'Next Week'} ({currentActivities.length})</h3>
            <div className="selected-activities-list">
              {currentActivities.map(activity => (
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
            const isSelected = currentActivities.find(a => a.id === activity.id);
            
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
                  {isSelected ? 'Added ✓' : `Add to ${selectedWeekView === 'current' ? 'This Week' : 'Next Week'}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Get all weeks since user started logging emotions (chronological order - oldest to newest)
  const getAllWeeksSinceStart = () => {
    const emotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    if (emotions.length === 0) return [];
    
    const weeks = new Set();
    emotions.forEach(emotion => {
      const emotionDate = new Date(emotion.timestamp);
      const { startOfWeek } = getCalendarWeek(emotionDate);
      const weekKey = startOfWeek.toISOString().split('T')[0];
      weeks.add(weekKey);
    });
    
    // Sort chronologically - oldest first (past weeks before current week)
    return Array.from(weeks).sort((a, b) => new Date(a) - new Date(b));
  };

  // Render analytics section with weekly navigation
  const renderAnalyticsSection = () => {
    const analytics = getAnalyticsData();
    
  // Get all weeks since user started logging emotions (chronological order - oldest to newest)
  const getAllWeeksSinceStart = () => {
    const emotions = JSON.parse(localStorage.getItem('pome_emotions') || '[]');
    if (emotions.length === 0) return [];
    
    const weeks = new Set();
    emotions.forEach(emotion => {
      const emotionDate = new Date(emotion.timestamp);
      const { startOfWeek } = getCalendarWeek(emotionDate);
      const weekKey = startOfWeek.toISOString().split('T')[0];
      weeks.add(weekKey);
    });
    
    // Sort chronologically - oldest first (past weeks before current week)
    return Array.from(weeks).sort((a, b) => new Date(a) - new Date(b));
  };
    const allWeeks = getAllWeeksSinceStart();
    const selectedWeekData = getWeekData(analyticsWeekView);

    return (
      <div className="analytics-section">
        <div className="section-header">
          <h2>Your Emotional & Activity Patterns</h2>
          <p>Insights into your emotional journey and activity engagement.</p>
        </div>

        {/* Weekly Navigation for Analytics - Moved to top */}
        {allWeeks.length > 0 && (
          <div className="analytics-week-navigation">
            <h3>Select Week to View</h3>
            <div className="week-selector">
              {allWeeks.map((weekKey, index) => {
                const weekStart = new Date(weekKey);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                const weekRange = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                
                // Check if this is the current week or selected week
                const { startOfWeek } = getCalendarWeek();
                const isCurrentWeek = weekStart.toDateString() === startOfWeek.toDateString();
                const isSelected = analyticsWeekView === weekKey || (analyticsWeekView === 'current' && isCurrentWeek);
                
                return (
                  <button
                    key={weekKey}
                    className={`week-selector-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setAnalyticsWeekView(weekKey)}
                  >
                    {weekRange}
                    {isCurrentWeek && <small>Current Week</small>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
            {/* Updated Summary Cards - Use selected week data */}
            <div className="analytics-summary">
              <div className="summary-card compact">
                <h3>{selectedWeekData.emotions.length}</h3>
                <p>Emotions Logged</p>
                <small>{selectedWeekData.weekRange}</small>
              </div>
              <div className="summary-card compact">
                <h3>{selectedWeekData.activities.length}</h3>
                <p>Activities Planned</p>
                <small>{selectedWeekData.weekRange}</small>
              </div>
              <div className="summary-card compact">
                <h3>{analytics.dayStreak}</h3>
                <p>Day Streak</p>
                <small>Consecutive days</small>
              </div>
            </div>

            {/* Your Emotion Journey - Updated with quadrant analytics and specific emotions */}
            {selectedWeekData.emotions.length > 0 && (
              <div className="emotion-journey">
                <h3>Your Emotion Journey</h3>
                <p className="week-range">Week of {selectedWeekData.weekRange}</p>
                
                {/* Quadrant Analytics - WITH percentages */}
                <div className="quadrant-analytics">
                  <h4>Emotion Quadrants</h4>
                  <div className="quadrant-breakdown">
                    {Object.keys(EMOTION_DATA).map(quadrant => {
                      const count = selectedWeekData.emotions.filter(e => e.quadrant === quadrant).length;
                      const percentage = selectedWeekData.emotions.length > 0 ? Math.round((count / selectedWeekData.emotions.length) * 100) : 0;
                      
                      return count > 0 ? (
                        <div key={quadrant} className="quadrant-stat">
                          <div className="quadrant-name">{EMOTION_DATA[quadrant].name}</div>
                          <div className="quadrant-count">{count} times ({percentage}%)</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                
                {/* Specific Emotions - WITHOUT percentages, WITH date and time */}
                <div className="specific-emotions">
                  <h4>Specific Emotions</h4>
                  <div className="emotions-timeline">
                    {selectedWeekData.emotions
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Most recent first
                      .reduce((acc, emotion) => {
                        const existing = acc.find(e => e.emotion === emotion.emotion);
                        if (existing) {
                          existing.count++;
                          existing.timestamps.push(emotion.timestamp);
                        } else {
                          acc.push({
                            emotion: emotion.emotion,
                            quadrant: emotion.quadrant,
                            count: 1,
                            timestamps: [emotion.timestamp]
                          });
                        }
                        return acc;
                      }, [])
                      .map((emotionData, index) => (
                        <div key={index} className="emotion-timeline-item">
                          <div className="emotion-header">
                            <span className="emotion-name">{emotionData.emotion}</span>
                            <span className="emotion-count">{emotionData.count} times</span>
                            <span className="quadrant-label">{EMOTION_DATA[emotionData.quadrant]?.name}</span>
                          </div>
                          <div className="emotion-timestamps">
                            {emotionData.timestamps.slice(0, 5).map((timestamp, i) => (
                              <span key={i} className="timestamp">{timestamp}</span>
                            ))}
                            {emotionData.timestamps.length > 5 && (
                              <span className="more-timestamps">+{emotionData.timestamps.length - 5} more</span>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Your Activity Focus - Available for all weeks */}
            <div className="activity-focus-chart">
              <h3>Your Activity Focus</h3>
              <p className="week-range">Week of {selectedWeekData.weekRange}</p>
              
              {selectedWeekData.activities.length > 0 ? (
                <div className="activity-chart">
                  {['physical', 'emotional', 'social', 'natural', 'spiritual'].map(category => {
                    const count = selectedWeekData.activities.filter(activity => 
                      activity.categories.includes(category)
                    ).length;
                    
                    const maxCount = Math.max(...['physical', 'emotional', 'social', 'natural', 'spiritual'].map(cat => 
                      selectedWeekData.activities.filter(a => a.categories.includes(cat)).length
                    ), 1);
                    
                    const percentage = (count / maxCount) * 100;
                    
                    return (
                      <div key={category} className="chart-bar-container">
                        <div className="chart-category">{category}</div>
                        <div className="chart-bar-wrapper">
                          <div 
                            className={`chart-bar ${category}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <span className="chart-count">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-activities-message">
                  <p>No activities planned for this week.</p>
                  <p>Visit the Activities section to plan activities for any week!</p>
                </div>
              )}
            </div>
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