import { teamMembers } from "../../data/team";
import TeamCard from "./TeamCard";

/**
 * TeamGrid Component
 * 
 * Renders the collection of team members in a responsive multi-column grid layout.
 * Optimized with balanced row gap spacing and clean container boundaries.
 */
const TeamGrid = () => {
  return (
    <div className="team-grid mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3 xl:grid-cols-4">
      {teamMembers?.map((member, index) => (
        <TeamCard
          key={member.id || member.name || index}
          member={member}
          index={index}
        />
      ))}
    </div>
  );
};

export default TeamGrid;