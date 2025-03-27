type Score = {
  is_sprint: boolean;
  points: number;
  position: number;
};

const Scores: Score[] = [
  // Full Races
  { is_sprint: false, points: 25, position: 1 },
  { is_sprint: false, points: 18, position: 2 },
  { is_sprint: false, points: 15, position: 3 },
  { is_sprint: false, points: 12, position: 4 },
  { is_sprint: false, points: 10, position: 5 },
  { is_sprint: false, points: 8, position: 6 },
  { is_sprint: false, points: 6, position: 7 },
  { is_sprint: false, points: 4, position: 8 },
  { is_sprint: false, points: 2, position: 9 },
  { is_sprint: false, points: 1, position: 10 },

  //Sprint Races
  { is_sprint: true, points: 8, position: 1 },
  { is_sprint: true, points: 7, position: 2 },
  { is_sprint: true, points: 6, position: 3 },
  { is_sprint: true, points: 5, position: 4 },
  { is_sprint: true, points: 4, position: 5 },
  { is_sprint: true, points: 3, position: 6 },
  { is_sprint: true, points: 2, position: 7 },
  { is_sprint: true, points: 1, position: 8 },
];

export default Scores;
