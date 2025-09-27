import React from 'react';
import { Users, MessageCircle } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
}

interface AttendeesListProps {
  attendees: Attendee[];
  eventTitle: string;
  onStartChat: (attendeeId: string) => void;
}

export default function AttendeesList({ attendees, eventTitle, onStartChat }: AttendeesListProps) {
  if (attendees.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-lg">Who's Going</h3>
        </div>
        <p className="text-gray-500 text-center py-8">
          No one has joined this event yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-lg">Who's Going ({attendees.length})</h3>
      </div>

      <div className="space-y-4">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <img
                src={attendee.avatar}
                alt={attendee.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{attendee.name}</h4>
                {attendee.mutualFriends && attendee.mutualFriends > 0 && (
                  <p className="text-sm text-gray-500">
                    {attendee.mutualFriends} mutual friend{attendee.mutualFriends > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onStartChat(attendee.id)}
              className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
              title="Start conversation"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {attendees.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-purple-600 hover:text-purple-700 font-medium py-2 transition-colors">
            View All Attendees
          </button>
        </div>
      )}
    </div>
  );
}