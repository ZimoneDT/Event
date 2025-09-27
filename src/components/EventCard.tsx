import React, { useState } from 'react';
import { MapPin, Calendar, Users, Heart } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  price: string;
  organizer: {
    name: string;
    avatar: string;
  };
  onJoin: (eventId: string) => void;
  onToggleFavorite: (eventId: string) => void;
  isJoined: boolean;
  isFavorited: boolean;
}

export default function EventCard({
  id,
  title,
  image,
  date,
  time,
  location,
  distance,
  attendees,
  maxAttendees,
  category,
  price,
  organizer,
  onJoin,
  onToggleFavorite,
  isJoined,
  isFavorited
}: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full h-48 object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
        <button
          onClick={() => onToggleFavorite(id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location} • {distance}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span>{attendees}/{maxAttendees} going</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={organizer.avatar}
              alt={organizer.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">by {organizer.name}</span>
          </div>
          <span className="font-bold text-lg text-purple-600">{price}</span>
        </div>

        <button
          onClick={() => onJoin(id)}
          disabled={attendees >= maxAttendees}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isJoined
              ? 'bg-green-500 text-white'
              : attendees >= maxAttendees
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
          }`}
        >
          {isJoined ? 'Joined!' : attendees >= maxAttendees ? 'Full' : 'Join Event'}
        </button>
      </div>
    </div>
  );
}