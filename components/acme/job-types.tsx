import { Pill } from "../ui/pill";

const jobs: string[] = [
  "House Cleaning",
  "Handyman Services",
  "Gardening",
  "Tutoring",
  "Plumbing",
  "Electrition",
  "Painting",
  "Flooring",
  "Roofing",
  "Window Installation",
  "Door Installation",
  "Tile Work",
  "Gutter Installation",
  "Driveway and Walkway",
  "Installing Fencing",
  "Installing Garage Door",
  "Installing Bathroom Fixtures",
];

function JobTypes() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {jobs.map((job, index) => (
          <li key={job + index}>
            <Pill text={job} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobTypes;
