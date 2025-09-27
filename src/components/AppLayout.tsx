import React, { useState, useMemo } from 'react';
import { Plus, MapPin, Users, Calendar } from 'lucide-react';
import EventCard from './EventCard';
import FilterBar from './FilterBar';
import CreateEventModal from './CreateEventModal';
import AttendeesList from './AttendeesList';

const HERO_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847927853_7fcdaad7.webp';

const EVENT_IMAGES = [
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847928652_3fb53f1e.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847930502_7d679d9e.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847932241_171c767e.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847933996_dfceefd4.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847943302_7f339c1a.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847945153_9f010252.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847947266_c303e45d.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847949086_f748bebc.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847949936_00126c24.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847951717_12f0190a.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847953500_398c1bba.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847955288_3eac4737.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847959237_5cf815bd.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847960986_52c583d3.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847962824_5c82e84f.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847964599_4b2cf9b5.webp'
];

const PROFILE_IMAGES = [
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847975144_31af3187.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847976974_cbddac4c.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847978784_2a864640.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847980561_57e1d293.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847982327_8fb5ef05.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847984087_9966d5e7.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847985875_40b51f8d.webp',
  'https://d64gsuwffb70l.cloudfront.net/68d5e3925f63c52e05a1e935_1758847987665_39704482.webp'
];

const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    image: EVENT_IMAGES[0],
    date: 'Jul 15, 2024',
    time: '6:00 PM',
    location: 'Central Park',
    distance: '2.3 miles',
    attendees: 45,
    maxAttendees: 100,
    category: 'Music',
    price: '$25',
    organizer: { name: 'Sarah Chen', avatar: PROFILE_IMAGES[0] }
  },
  {
    id: '2',
    title: 'Food Truck Rally',
    image: EVENT_IMAGES[4],
    date: 'Jul 12, 2024',
    time: '12:00 PM',
    location: 'Downtown Plaza',
    distance: '1.8 miles',
    attendees: 32,
    maxAttendees: 80,
    category: 'Food',
    price: 'Free',
    organizer: { name: 'Mike Rodriguez', avatar: PROFILE_IMAGES[1] }
  },
  {
    id: '3',
    title: 'Beach Volleyball Tournament',
    image: EVENT_IMAGES[8],
    date: 'Jul 20, 2024',
    time: '10:00 AM',
    location: 'Sunset Beach',
    distance: '5.2 miles',
    attendees: 18,
    maxAttendees: 24,
    category: 'Sports',
    price: '$15',
    organizer: { name: 'Alex Kim', avatar: PROFILE_IMAGES[2] }
  }
];

export default function AppLayout() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [favoriteEvents, setFavoriteEvents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('25 miles');
  const [selectedDate, setSelectedDate] = useState('Any time');
  const [showMap, setShowMap] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [location, setLocation] = useState('San Francisco, CA');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const handleJoinEvent = (eventId: string) => {
    if (joinedEvents.includes(eventId)) {
      setJoinedEvents(prev => prev.filter(id => id !== eventId));
      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, attendees: event.attendees - 1 } : event
      ));
    } else {
      setJoinedEvents(prev => [...prev, eventId]);
      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, attendees: event.attendees + 1 } : event
      ));
    }
  };

  const handleToggleFavorite = (eventId: string) => {
    setFavoriteEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleCreateEvent = (eventData: any) => {
    const newEvent = {
      ...eventData,
      image: EVENT_IMAGES[Math.floor(Math.random() * EVENT_IMAGES.length)],
      distance: '0.5 miles'
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleStartChat = (attendeeId: string) => {
    console.log('Starting chat with attendee:', attendeeId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)), url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Find Your Tribe</h1>
          <p className="text-xl mb-8">Discover amazing events and connect with like-minded people in your area</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{events.length}</h3>
            <p className="text-gray-600">Events Available</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{events.reduce((sum, event) => sum + event.attendees, 0)}</h3>
            <p className="text-gray-600">People Going</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">5</h3>
            <p className="text-gray-600">Miles Radius</p>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedDistance={selectedDistance}
          selectedDate={selectedDate}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onDistanceChange={setSelectedDistance}
          onDateChange={setSelectedDate}
          onToggleMap={() => setShowMap(!showMap)}
          showMap={showMap}
        />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onJoin={handleJoinEvent}
              onToggleFavorite={handleToggleFavorite}
              isJoined={joinedEvents.includes(event.id)}
              isFavorited={favoriteEvents.includes(event.id)}
            />
          ))}
        </div>

        {/* Attendees List for First Event */}
        {events.length > 0 && (
          <AttendeesList
            attendees={[
              { id: '1', name: 'Sarah Chen', avatar: PROFILE_IMAGES[0], mutualFriends: 3 },
              { id: '2', name: 'Mike Rodriguez', avatar: PROFILE_IMAGES[1], mutualFriends: 1 },
              { id: '3', name: 'Alex Kim', avatar: PROFILE_IMAGES[2] }
            ]}
            eventTitle={events[0].title}
            onStartChat={handleStartChat}
          />
        )}
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}