export const adminUsers = [
  { id: 'u001', name: 'Trishya Nigam', email: 'trishya@example.com', role: 'participant', status: 'active', registeredAt: '2026-01-15T08:00:00Z', avatar: null, hackathons: 4, teams: 2, submissions: 3 },
  { id: 'u002', name: 'Priya Gupta', email: 'priya@example.com', role: 'organizer', status: 'active', registeredAt: '2026-02-01T10:00:00Z', avatar: null, hackathons: 6, teams: 0, submissions: 0 },
  { id: 'u003', name: 'Rohan Verma', email: 'rohan@example.com', role: 'participant', status: 'blocked', registeredAt: '2026-03-10T14:00:00Z', avatar: null, hackathons: 1, teams: 1, submissions: 1 },
  { id: 'u004', name: 'Dr. Anita Joshi', email: 'anita@example.com', role: 'judge', status: 'active', registeredAt: '2026-01-20T09:00:00Z', avatar: null, hackathons: 0, teams: 0, submissions: 0 },
  { id: 'u005', name: 'Kabir Mehta', email: 'kabir@example.com', role: 'participant', status: 'active', registeredAt: '2026-04-05T11:00:00Z', avatar: null, hackathons: 3, teams: 2, submissions: 2 },
  { id: 'u006', name: 'Sneha Rao', email: 'sneha@example.com', role: 'organizer', status: 'suspended', registeredAt: '2026-02-20T13:00:00Z', avatar: null, hackathons: 2, teams: 0, submissions: 0 },
  { id: 'u007', name: 'Vikram Singh', email: 'vikram@example.com', role: 'participant', status: 'active', registeredAt: '2026-05-01T08:30:00Z', avatar: null, hackathons: 2, teams: 1, submissions: 1 },
  { id: 'u008', name: 'Meera Nair', email: 'meera@example.com', role: 'judge', status: 'active', registeredAt: '2026-03-15T16:00:00Z', avatar: null, hackathons: 0, teams: 0, submissions: 0 },
  { id: 'u009', name: 'Amit Patel', email: 'amit@example.com', role: 'participant', status: 'active', registeredAt: '2026-06-10T07:00:00Z', avatar: null, hackathons: 1, teams: 1, submissions: 1 },
  { id: 'u010', name: 'Divya Krishnan', email: 'divya@example.com', role: 'organizer', status: 'active', registeredAt: '2026-04-22T12:00:00Z', avatar: null, hackathons: 3, teams: 0, submissions: 0 },
  { id: 'u011', name: 'Harsh Tiwari', email: 'harsh@example.com', role: 'participant', status: 'active', registeredAt: '2026-07-01T09:00:00Z', avatar: null, hackathons: 0, teams: 0, submissions: 0 },
  { id: 'u012', name: 'Nisha Bose', email: 'nisha@example.com', role: 'participant', status: 'active', registeredAt: '2026-06-28T10:00:00Z', avatar: null, hackathons: 2, teams: 1, submissions: 1 },
];

export const getUserById = (id) => adminUsers.find((u) => u.id === id) || adminUsers[0];
