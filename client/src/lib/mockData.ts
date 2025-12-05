export interface User {
  rank: number;
  address: string;
  amountBurned: number;
  isKing?: boolean;
}

export const MOCK_USERS: User[] = [
  {
    rank: 1,
    address: "74yfykfmrAQRfzPfjWiKoYLCwvPTmtDsMuCUCcgV2hGy",
    amountBurned: 1500000,
    isKing: true,
  },
  {
    rank: 2,
    address: "FbQMqCpDbnthzEnDyjDsPiwzxdJquvBckLVcg3j7shLj",
    amountBurned: 1100000,
  },
  {
    rank: 3,
    address: "AaBCcdDG0eb395a",
    amountBurned: 950000,
  },
  {
    rank: 4,
    address: "SoLanaDegEn99x",
    amountBurned: 800000,
  },
  {
    rank: 5,
    address: "BuRnItDoWn777",
    amountBurned: 750000,
  },
  {
    rank: 6,
    address: "CryPt0K1nG22",
    amountBurned: 600000,
  },
  {
    rank: 7,
    address: "MoOnBoY_420",
    amountBurned: 550000,
  },
  {
    rank: 8,
    address: "DiaMonDhAnDs",
    amountBurned: 400000,
  },
  {
    rank: 9,
    address: "WaGmWifH4t",
    amountBurned: 300000,
  },
  {
    rank: 10,
    address: "JeEtSlayer9000",
    amountBurned: 250000,
  },
  {
    rank: 11,
    address: "PaperHands00",
    amountBurned: 100000,
  },
  {
    rank: 12,
    address: "LateToTheParty",
    amountBurned: 50000,
  },
];

export const getKing = () => MOCK_USERS.find(u => u.rank === 1);
export const getLeaderboard = () => MOCK_USERS.filter(u => u.rank > 1);
