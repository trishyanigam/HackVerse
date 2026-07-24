import React from 'react';
import PageContainer from '../components/ui/PageContainer';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

export const Leaderboard = () => {
  return (
    <PageContainer
      title="Global Leaderboard Rankings"
      description="View evaluated top scores, winning projects, and prize awards across active and past HackVerse sprints."
      className="space-y-8"
    >
      <LeaderboardTable />
    </PageContainer>
  );
};

export default Leaderboard;
