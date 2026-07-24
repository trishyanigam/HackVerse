import { FiAward, FiStar } from 'react-icons/fi';
import { BiTrophy } from 'react-icons/bi';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockLeaderboard } from '../../mock/leaderboard';

export const LeaderboardTable = ({ leaderboard = mockLeaderboard }) => {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-xs">
          <BiTrophy size={13} className="text-amber-400" />
          1st Place
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-300/10 text-slate-300 border border-slate-300/20 font-bold text-xs">
          <FiAward size={13} className="text-slate-300" />
          2nd Place
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-700/10 text-amber-600 border border-amber-700/20 font-bold text-xs">
          <FiAward size={13} className="text-amber-600" />
          3rd Place
        </span>
      );
    }
    return (
      <span className="font-bold text-xs text-slate-400 pl-2">
        #{rank}
      </span>
    );
  };

  return (
    <Card
      title="Global Leaderboard Rankings"
      subtitle="Evaluated top performers from active and recent HackVerse events."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dark-border/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="pb-3.5 pl-3">Rank</th>
              <th className="pb-3.5">Team Name</th>
              <th className="pb-3.5">Project Name</th>
              <th className="pb-3.5">Track</th>
              <th className="pb-3.5 text-center">Score</th>
              <th className="pb-3.5 text-right pr-3">Prize Award</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/20 text-slate-300 text-xs">
            {leaderboard.map((row) => (
              <tr key={row.rank} className="hover:bg-slate-900/30 transition-colors">
                <td className="py-4 pl-3">{getRankBadge(row.rank)}</td>
                <td className="py-4 font-bold text-white">{row.teamName}</td>
                <td className="py-4 font-medium text-slate-300">{row.projectName}</td>
                <td className="py-4">
                  <Badge variant="neutral" size="sm">{row.track}</Badge>
                </td>
                <td className="py-4 text-center font-bold text-gradient">
                  {row.score} / 100
                </td>
                <td className="py-4 text-right pr-3 font-semibold text-emerald-400">
                  {row.prize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeaderboardTable;
